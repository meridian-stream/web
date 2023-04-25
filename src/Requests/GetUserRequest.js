import BaseRequest from "../Core/Requests/BaseRequest";

class GetUserRequest extends BaseRequest
{
    constructor(userId) {
        super(
            'get',
            '/users/' + userId,
        );
    }
}

export default GetUserRequest;
