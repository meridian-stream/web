import BaseRequest from "@/Core/Requests/BaseRequest.js";

class GetChannelsRequest extends BaseRequest
{
    constructor(searchTerm) {
        super(
            'get',
            '/channels?query=' + searchTerm,
            {},
            {},
        );
    }
}

export default GetChannelsRequest;
