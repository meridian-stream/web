import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateFolderRequest extends BaseRequest
{
    constructor(folderId, name) {
        super(
            'patch',
            '/folders/' + folderId,
            {
                name: null,
            },
            {
                name,
            },
        );
    }
}

export default UpdateFolderRequest;
