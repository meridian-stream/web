import BaseRequest from "../Core/Requests/BaseRequest";

class GetReportReasonsRequest extends BaseRequest
{
    constructor() {
        super(
            'get',
            '/report-reasons',
        );
    }
}

export default GetReportReasonsRequest;
