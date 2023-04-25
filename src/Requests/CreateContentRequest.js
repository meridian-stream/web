import BaseRequest from "../Core/Requests/BaseRequest";

class CreateContentRequest extends BaseRequest
{
    constructor(channelId, contentId) {
        super(
            'post',
            '/channels/' + channelId + '/contents',
            {
                title: null,
            },
            {
                id: contentId,
                is_listed: true,
            },
        );
    }
}

export default CreateContentRequest;
