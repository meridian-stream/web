import BaseRequest from "../Core/Requests/BaseRequest";

class GetContentRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'get',
            '/contents/' + contentId,
            {},
            {},
        );
    }
}

export default GetContentRequest;
