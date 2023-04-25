import BaseRequest from "../Core/Requests/BaseRequest";

class CreateFolderRequest extends BaseRequest
{
    constructor(folderId) {
        super(
            'post',
            '/folders/' + folderId + '/folders',
            {
                name: null,
                channel_id: null,
                user_id: null,
            },
            {},
        );
    }
}

export default CreateFolderRequest;
