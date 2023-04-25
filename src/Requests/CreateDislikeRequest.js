import BaseRequest from "../Core/Requests/BaseRequest";

class CreateDislikeRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'post',
            '/contents/' + contentId + '/dislikes'
        );
    }
}

export default CreateDislikeRequest;
