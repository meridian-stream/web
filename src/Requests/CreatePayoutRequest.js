import BaseRequest from "../Core/Requests/BaseRequest";

class CreatePayoutRequest extends BaseRequest
{
    constructor(channelId) {
        super(
            'post',
            '/payouts',
            {
                channel_id: null,
            },
            {
                channel_id: channelId,
            },
        );
    }
}

export default CreatePayoutRequest;
