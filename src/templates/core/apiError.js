// @flow
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

import { isSuccess } from './isSuccess';
import { Result } from './result';

export class ApiError extends Error {

    url: string;
    status: number;
    statusText: string;
    body: any;

    constructor(result: $ReadOnly<Result>, message: string) {
        super(message);

        this.url = result.url;
        this.status = result.status;
        this.statusText = result.statusText;
        this.body = result.body;
    }
}

export const ApiError$Message = {
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    BAD_GATEWAY: 'Bad Gateway',
    SERVICE_UNAVAILABLE: 'Service Unavailable',
    GENERIC_ERROR: 'Generic Error',
}

/**
 * Catch common errors (based on status code).
 * @param result
 */
export function catchGenericError(result: Result): void {
    switch (result.status) {
        case 400: throw new ApiError(result, ApiError$Message.BAD_REQUEST);
        case 401: throw new ApiError(result, ApiError$Message.UNAUTHORIZED);
        case 403: throw new ApiError(result, ApiError$Message.FORBIDDEN);
        case 404: throw new ApiError(result, ApiError$Message.NOT_FOUND);
        case 500: throw new ApiError(result, ApiError$Message.INTERNAL_SERVER_ERROR);
        case 502: throw new ApiError(result, ApiError$Message.BAD_GATEWAY);
        case 503: throw new ApiError(result, ApiError$Message.SERVICE_UNAVAILABLE);
    }

    if (!isSuccess(result.status)) {
        throw new ApiError(result, ApiError$Message.GENERIC_ERROR);
    }
}

