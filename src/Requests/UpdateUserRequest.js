import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateUserRequest extends BaseRequest
{
    constructor(userId, name, image_id) {
        super(
            'patch',
            '/users/' + userId,
            {
                name: null,
                image_id: null,
            },
            {
                name,
                image_id,
            }
        );
    }
}

export default UpdateUserRequest;
