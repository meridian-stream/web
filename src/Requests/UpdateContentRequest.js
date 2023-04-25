import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateContentRequest extends BaseRequest
{
    constructor(content) {
        super(
            'patch',
            '/contents/' + content.id,
            {
                title: null,
            },
            content,
        );
    }
}

export default UpdateContentRequest;
