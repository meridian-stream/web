import BaseRequest from "@/Core/Requests/BaseRequest.js";

class ForgottenPasswordRequest extends BaseRequest
{
    constructor() {
        super(
            'post',
            '/forgotten-password',
            {
                email: '',
            },
            {},
        );
    }
}

export default ForgottenPasswordRequest;
