import PaginatedRequest from "../Core/Requests/PaginatedRequest";

class GetChannelPayoutsRequest extends PaginatedRequest
{
    constructor(channelId) {
        super(
            'get',
            '/channels/' + channelId + '/payouts',
            {},
        );
    }
}

export default GetChannelPayoutsRequest;
