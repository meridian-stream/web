import BaseRequest from "../Core/Requests/BaseRequest";

class GetTagsRequest extends BaseRequest
{
    constructor(searchTerm) {
        let uri = '/tags';
        if (typeof searchTerm !== 'undefined') {
            uri += '?query=' + searchTerm;
        }
        super(
            'get',
            uri,
            {},
            {},
            null,
        );
    }
}

export default GetTagsRequest;
