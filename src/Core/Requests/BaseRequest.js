import BadFormException from "../Exceptions/BadFormException";
import ConnectionRefused from "../Responses/ConnectionRefused";
import NotFound from "../Responses/NotFound";
import Unauthorised from "../Responses/Unauthorised";
import Forbidden from "../Responses/Forbidden";

// Internal-only fields we shouldn't pass up to the server or allow to be fields
const INTERNAL_FIELDS = [
    'errors',
    'expectedResponse',
    'fields',
    'isLoading',
    'method',
    'response',
    'uri',
];

class BaseRequest
{
    constructor(
        method,
        uri,
        fields,
        defaultValues,
        expectedResponse,
    ) {
        if (typeof method === 'undefined') {
            throw new BadFormException('Forms require a method');
        }

        if (typeof uri === 'undefined') {
            throw new BadFormException('Forms require a URI');
        }

        if (typeof fields === 'undefined') {
            fields = {};
        }

        if (typeof expectedResponse === 'undefined') {
            expectedResponse = Object;
        }

        this.method = method;
        this.uri = uri;
        for (let key in Object.keys(fields)) {
            this[key] = fields[key];
        }
        // this.fields = fields;
        this.errors = {};
        this.expectedResponse = expectedResponse;
        this.response = null;

        for (let field in defaultValues) {
            if (!field in Object.keys(this)) {
                throw new BadFormException('You cannot set a default value for a field that isn\'t defined.')
            }
            if (field in INTERNAL_FIELDS) {
                throw new BadFormException('"' + field + '" is a reserved word in request field names.')
            }
            this[field] = defaultValues[field];
        }
    }

    clearErrors(field)
    {
        if (typeof field === 'undefined') {
            field = '*';
        }

        if (field === '*') {
            this.errors = {};
        } else {
            if (!field in Object.keys(this.fields)) {
                throw new BadFormException('You cannot clear the errors for a field that isn\'t defined.')
            }

            this.errors[field] = [];
        }
    }

    getData()
    {
        let tempCopy = Object.assign({}, this);
        for (let i = 0; i < INTERNAL_FIELDS.length; i++) {
            delete tempCopy[INTERNAL_FIELDS[i]];
        }
        return tempCopy;
    }

    submitTo(server, ignoreLoading)
    {
        if (typeof ignoreLoading === 'undefined') {
            ignoreLoading = false;
        }

        if (this.isLoading && !ignoreLoading) {
            throw new BadFormException('The form is already submitted.');
        }

        this.setLoading(true);

        return new Promise((resolve, reject) => {
            server[this.method](this.uri, this.getData()).then(rawResponse => {
                if (this.expectedResponse !== null) {
                    this.response = new this.expectedResponse;
                    let dataToUse = rawResponse.data.data;
                    Object.assign(this.response, dataToUse);
                } else {
                    this.response = rawResponse.data.data;
                }
                resolve(this.response);
            }).catch(rawResponse => {
                if (typeof rawResponse.response === 'undefined') {
                    this.response = new ConnectionRefused;
                } else if (rawResponse.response.status === 404) {
                    this.response = new NotFound;
                } else if (rawResponse.response.status === 401) {
                    this.response = new Unauthorised;
                } else if (rawResponse.response.status === 403) {
                    this.response = new Forbidden;
                } else if (rawResponse.response.status === 422 || rawResponse.response.status === 400) {
                    this.errors = rawResponse.response.data.errors;
                }
                reject(this.response);
            }).finally(() => { this.setLoading(false) })
        });
    }

    setLoading(trueOrFalse)
    {
        this.isLoading = trueOrFalse;
    }
}

export default BaseRequest;
