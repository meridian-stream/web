import BaseRequest from "../Core/Requests/BaseRequest";

class GetFolderRequest extends BaseRequest
{
    constructor(folderId) {
        super(
            'get',
            '/folders/' + folderId,
            {},
            {},
        );
    }
}

export default GetFolderRequest;
