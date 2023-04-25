import BaseRequest from "../Core/Requests/BaseRequest";

class DeleteLikeRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'delete',
            '/contents/' + contentId + '/likes'
        );
    }
}

export default DeleteLikeRequest;
