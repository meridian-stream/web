import BaseRequest from "../Core/Requests/BaseRequest";

class PublishContentRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'patch',
            '/contents/' + contentId,
            {
                published_at: null,
            },
        );
    }
}

export default PublishContentRequest;
