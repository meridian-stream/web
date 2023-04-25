import BaseRequest from "../Core/Requests/BaseRequest";

class CreateViewRequest extends BaseRequest
{
    constructor(contentId, userId) {
        super(
            'post',
            '/views',
            {
                content_id: null,
                user_id: null,
            },
            {
                content_id: contentId,
                user_id: userId,
            },
        );
    }
}

export default CreateViewRequest;
