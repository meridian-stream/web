import BaseRequest from "../Core/Requests/BaseRequest";

class CreateSubscriptionRequest extends BaseRequest
{
    constructor() {
        super(
            'post',
            '/subscriptions',
            {
                card_id: null,
                channel_id: null,
                product_id: null,
            },
            {},
        );
    }
}

export default CreateSubscriptionRequest;
