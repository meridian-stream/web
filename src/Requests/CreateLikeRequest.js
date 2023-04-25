import BaseRequest from "../Core/Requests/BaseRequest";

class CreateLikeRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'post',
            '/contents/' + contentId + '/likes',
        );
    }
}

export default CreateLikeRequest;
