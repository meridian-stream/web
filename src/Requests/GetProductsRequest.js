import BaseRequest from "../Core/Requests/BaseRequest";

class GetProductsRequest extends BaseRequest
{
    constructor() {
        super(
            'get',
            '/products',
            {},
            {},
            null,
        );
    }
}

export default GetProductsRequest;
