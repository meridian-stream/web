import BaseRequest from "../Core/Requests/BaseRequest";

class GetCardsRequest extends BaseRequest
{
    constructor(user) {
        super(
            'get',
            '/users/' + user?.id + '/cards',
            {},
            {},
            null,
        );
    }
}

export default GetCardsRequest;
