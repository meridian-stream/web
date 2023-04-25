import BaseRequest from "../Core/Requests/BaseRequest";

class DeleteFollowRequest extends BaseRequest
{
    constructor(channelId) {
        super(
            'delete',
            '/channels/' + channelId + '/follows',
        );
    }
}

export default DeleteFollowRequest;
