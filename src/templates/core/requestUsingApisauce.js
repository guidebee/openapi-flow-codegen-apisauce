// @flow
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { Result } from './result';
import { OpenAPI } from './OpenAPI';
import apisauce from 'apisauce';

/**
 * Request content using the new Fetch API. This is the default API that is used and
 * is create for all JSON, XML and text objects. However it is limited to UTF-8.
 * This is a problem for some of the Docs content, since that requires UTF-16!
 * @param url The url to request.
 * @param request The request object, containing method, headers, body, etc.
 * @param responseHeader The header we want to parse.
 */
export async function requestUsingApisauce(url: string, request: $ReadOnly<any>, responseHeader?: string): Promise<Result> {

    const api = apisauce.create({
        // eslint-disable-next-line
        baseURL: OpenAPI.BASE,
        // 10 second timeout...
        timeout: 10000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const apis ={
        'get': api.get,
        'put': api.put,
        'post': api.post,
        'delete': api.delete,
        'options':api.options,
        'head':api.head,
        'patch':api.patch,
    }

    const headers = request.headers;
    headers.forEach((value: string, key: string): void => {
        api.setHeader(key,value);
    });
    const response = await apis[request.method](url,request.body);


    // Create result object.
    return {
        url,
        ok: response.ok,
        status: response.status,
        body: response.data,
    };
}
