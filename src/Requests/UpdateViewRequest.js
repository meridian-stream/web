import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateViewRequest extends BaseRequest
{
    constructor(viewId, userId) {
        super(
            'patch',
            '/views/' + viewId,
            {
                content_id: null,
                user_id: null,
            },
            {
                user_id: userId,
            },
        );
    }
}

export default UpdateViewRequest;
