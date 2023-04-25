import BaseRequest from "../Core/Requests/BaseRequest";

class LoginRequest extends BaseRequest
{
    constructor(defaultValues)
    {
        super(
            'post',
            '/login',
            {
                email: ['required', 'email', 'min:5', 'max:255'],
                password: ['required', 'password'],
            },
            defaultValues,
        );
    }
}

export default LoginRequest;
