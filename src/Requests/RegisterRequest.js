import BaseRequest from "../Core/Requests/BaseRequest";

class RegisterRequest extends BaseRequest
{
    constructor() {
        super(
            'post',
            '/register',
            {
                name: null,
                email: null,
                password: null,
            },
            {}
        );
    }
}

export default RegisterRequest;
