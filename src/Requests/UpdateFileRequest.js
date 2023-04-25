import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateFileRequest extends BaseRequest
{
    constructor(fileId, nice_name) {
        super(
            'patch',
            '/files/' + fileId,
            {
                nice_name: null,
            },
            {
                nice_name,
            }
        );
    }
}

export default UpdateFileRequest;
