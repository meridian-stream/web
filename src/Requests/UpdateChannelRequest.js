import BaseRequest from "../Core/Requests/BaseRequest";

class UpdateChannelRequest extends BaseRequest
{
    constructor(channelId, channel) {
        super(
            'patch',
            '/channels/' + channelId,
            {
                name: null,
                slug: null,
            },
            {
                name: null,
                slug: null,
                image_id: channel.image?.id,
                about: channel.about,
                tagline: channel.tagline,
                enticement: channel.enticement,
            },
        );
    }
}

export default UpdateChannelRequest;
