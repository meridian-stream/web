import BaseRequest from "../Core/Requests/BaseRequest";

class AcceptSubscriptionsRequest extends BaseRequest
{
    constructor(channelId, channel) {
        super(
            'patch',
            '/channels/' + channelId,
            {
                is_accepting_subscriptions: null,
            },
            {
                is_accepting_subscriptions: channel.is_accepting_subscriptions,
            },
        );
    }
}

export default AcceptSubscriptionsRequest;
