import BaseRequest from "../Core/Requests/BaseRequest";

class CreateChannelRequest extends BaseRequest
{
    constructor(props) {
        super(
            'post',
            '/channels',
            {
                name: null,
                slug: null,
            },
            {}
        );
    }
}

export default CreateChannelRequest;
