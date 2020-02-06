import request from 'request';

import { IProxy, Imethod, IreqObj } from './proxy.interface';

import { IApiError } from './apiError.interface';
import { PROXY } from '../const/types';
import { provide } from 'inversify-binding-decorators';

@provide(PROXY)
class Proxy implements IProxy {
    execute(
        headers: request.Headers,
        uri: string,
        method: Imethod,
        gzip = false,
        ...reqBody: any[]
    ): Promise<any> {
        const reqObj: IreqObj = { headers, uri, method };
        if (gzip) {
            reqObj.gzip = true;
        }
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            if (reqBody[1]) {
                reqObj.json = false;
            } else {
                reqObj.json = true;
            }
            reqObj.body = reqBody[0];
        }
        return new Promise((resolve, reject) => {
            request(reqObj, (err: any, res: request.Response, body: any) => {
                if (err) {
                    const error: IApiError = {
                        error: {
                            statusCode: res.statusCode || 500,
                            code: res.statusCode || 500,
                            message: 'error in response',
                            developerMessage: res.statusMessage,
                        },
                    };
                    reject(error);
                }
                let parsedBody;
                try {
                    parsedBody = JSON.parse(body);
                } catch (e) {
                    parsedBody = body;
                }
                if (parsedBody.error) {
                    reject(parsedBody);
                } else {
                    if (res.statusCode.toString()[0] != '2') {
                        const error = {
                            error: {
                                statusCode: res.statusCode || 500,
                                response: parsedBody
                            },
                        };
                        reject(error);
                    } else {
                        resolve(parsedBody);
                    }
                }
            });
        });
    }
}