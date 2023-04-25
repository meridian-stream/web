import BaseRequest from "../Core/Requests/BaseRequest";

class CreateReportRequest extends BaseRequest
{
    constructor(contentId) {
        super(
            'post',
            '/contents/' + contentId + '/reports',
            {
                report_reason_id: null,
            },
            {
                report_reason_id: contentId,
            }
        );
    }
}

export default CreateReportRequest;
