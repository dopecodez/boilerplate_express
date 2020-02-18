import {IncomingHttpHeaders} from 'http';
export type Imethod = 'POST' | 'PUT' | 'GET' | 'PATCH';

export interface IreqObj {
    headers: IncomingHttpHeaders;
    uri: string;
    method: Imethod;
    json?: Object;
    body?: any;
    gzip?: boolean;
}

export interface IProxy {
    execute(
        options: IreqObj,
        ...reqBody: any[]
    ): Promise<any>;
}