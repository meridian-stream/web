import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateSubscriptionRequest extends BaseRequest
{
    constructor(subscriptionId) {
        super(
            'patch',
            '/subscriptions/' + subscriptionId,
            {
                cancel: null,
            },
            {}
        );
    }
}

export default UpdateSubscriptionRequest;
