import BaseRequest from "./BaseRequest";
import PaginatedResponse from "../Responses/PaginatedResponse";

class PaginatedRequest extends BaseRequest
{
    constructor(
        method,
        uri,
        data,
        page
    ) {
        super(
            method,
            uri,
            data,
            {},
            PaginatedResponse,
        );

        this.page = page;
    }

    loadMore(server)
    {
        this.page++;

        this.setLoading(true)

        let uriToUse;
        if (this.uri.includes('?')) {
            uriToUse = this.uri + '&page=' + this.page;
        } else {
            uriToUse = this.uri + '?page=' + this.page;
        }
        let clone = new BaseRequest(
            this.method,
            uriToUse,
            {},
            PaginatedResponse,
        )

        return new Promise((resolve, reject) => {
            clone.submitTo(server)
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    reject(response);
                })
                .finally(() => {
                    setTimeout(() => {
                        this.setLoading(false);
                    }, 1000);
                })
        })
    }
}

export default PaginatedRequest;
