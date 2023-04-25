import axios from "axios";
import env from "../env";

let instance = null;

class Server
{
    static getInstance()
    {
        if (instance === null) {
            instance = axios.create({
                baseURL: env.api.endpoint,
                timeout: env.api.timeout,
                headers: {
                    common: {
                        Authorization: null,
                    },
                },
            })
        }

        return instance;
    }

    static getAPIKey()
    {
        Server.getInstance();
        let apiKey = null;
        try {
            apiKey = JSON.parse(localStorage.getItem('api_key'));
        } catch (e) {
            localStorage.clear();
            window.location.reload();
        }
        if (apiKey !== null) {
            instance.defaults.headers.common.Authorization = apiKey.value;
        }
        return apiKey;
    }

    static setAPIKey(apiKey)
    {
        if (apiKey !== null) {
            localStorage.setItem('api_key', JSON.stringify(apiKey));
            instance.defaults.headers.common.Authorization = apiKey.value;
        } else {
            localStorage.setItem('api_key', null);
        }
    }
}

export default Server;
