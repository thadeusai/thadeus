import * as rp from 'request-promise';
import { thadeusConfig } from '../config/thadeus';

export const getRequest = (url: string, authorization: string, method = 'GET', body?: Record<string, any>) =>
    rp({
        uri: `${thadeusConfig.API_URL}/${url}`,
        headers: {
            authorization,
        },
        method,
        body: body ? body : null,
        json: body ? true : false,
    })