import BaseRequest from "@/Core/Requests/BaseRequest.js";

class PasswordResetRequest extends BaseRequest
{
    constructor() {
        super(
            'post',
            '/password-reset',
            {
                password: '',
                password_confirmation: '',
                token: '',
            },
            {},
        );
    }
}

export default PasswordResetRequest;
