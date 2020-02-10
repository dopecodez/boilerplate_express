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
        options: IreqObj,
        ...reqBody: any[]
    ): Promise<request.Response>;
}