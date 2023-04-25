import BaseRequest from "../Core/Requests/BaseRequest";

class DeleteDislikeRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'delete',
            '/contents/' + contentId + '/dislikes'
        );
    }
}

export default DeleteDislikeRequest;
