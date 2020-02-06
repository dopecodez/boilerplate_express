import * as request from 'request';

export type Imethod = 'POST' | 'PUT' | 'GET' | 'PATCH';

export interface IreqObj {
    headers: request.Headers;
    uri: string;
    method: Imethod;
    json?: boolean;
    body?: any;
    gzip?: boolean;
}

export interface IProxy {
    execute(
        headers: request.Headers,
        uri: string,
        method: Imethod,
        ...reqBody: any[]
    ): Promise<request.Response>;
}