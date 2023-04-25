import BaseRequest from "../Core/Requests/BaseRequest";

class GetTransfersRequest extends BaseRequest
{
    constructor(channelId) {
        super(
            'get',
            '/channels/' + channelId + '/transfers',
            {},
        );
    }
}

export default GetTransfersRequest;
