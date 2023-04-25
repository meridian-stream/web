import BaseRequest from "../Core/Requests/BaseRequest";

class GetTagsRequest extends BaseRequest
{
    constructor() {
        super(
            'get',
            '/tags',
            {},
            {},
        );
    }
}

export default GetTagsRequest;
