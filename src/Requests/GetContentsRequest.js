import PaginatedRequest from "../Core/Requests/PaginatedRequest";

class GetContentsRequest extends PaginatedRequest
{
    constructor(searchTerm, tags, channels, withUnpublished, withUnlisted) {
        let uri = '/contents';

        let queries = [];

        if (typeof searchTerm !== 'undefined' && searchTerm !== null) {
            queries.push('query=' + searchTerm);
        }

        if (
            typeof tags !== 'undefined' &&
            tags !== null &&
            tags.length > 0
        ) {
            for (let i = 0; i < tags.length; i++) {
                queries.push('tags[]=' + tags[i])
            }
        }

        if (
            typeof channels !== 'undefined' &&
            channels !== null &&
            channels.length > 0
        ) {
            for (let i = 0; i < channels.length; i++) {
                queries.push('channels[]=' + channels[i])
            }
        }

        if (
            typeof withUnlisted !== 'undefined' &&
            withUnlisted === true
        ) {
            queries.push('withUnlisted=true')
        }

        if (
            typeof withUnpublished !== 'undefined' &&
            withUnpublished === true
        ) {
            queries.push('withUnpublished=true')
        }

        if (queries.length > 0) {
            uri += '?';
            uri += queries.join('&');
        }

        super(
            'get',
            uri,
            {},
            1,
        );
    }
}

export default GetContentsRequest;
