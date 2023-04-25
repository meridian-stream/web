import BaseRequest from "../Core/Requests/BaseRequest";

class CreateFollowRequest extends BaseRequest
{
    constructor(channelId) {
        super(
            'post',
            '/channels/' + channelId + '/follows',
        );
    }
}

export default CreateFollowRequest;
