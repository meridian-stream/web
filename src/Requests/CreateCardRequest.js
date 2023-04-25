import BaseRequest from "../Core/Requests/BaseRequest";

class CreateCardRequest extends BaseRequest
{
    constructor(userId) {
        super(
            'post',
            '/users/' + userId + '/cards',
            {
                token: null,
            },
            {},
        );
    }
}

export default CreateCardRequest;
