import BaseRequest from "../Core/Requests/BaseRequest";

class GetChannelRequest extends BaseRequest
{
    constructor(channelSlugOrId) {
        super(
            'get',
            '/channels/' + channelSlugOrId,
        );
    }
}

export default GetChannelRequest;
