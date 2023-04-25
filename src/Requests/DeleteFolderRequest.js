import BaseRequest from "../Core/Requests/BaseRequest";

class DeleteFolderRequest extends BaseRequest
{
    constructor(folderId) {
        super(
            'delete',
            '/folders/' + folderId,
        );
    }
}

export default DeleteFolderRequest;
