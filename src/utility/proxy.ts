import got from 'got';
import { IProxy, IreqObj } from './proxy.interface';

import { IApiError } from './apiError.interface';
import { PROXY } from '../const/types';
import { provide } from 'inversify-binding-decorators';

@provide(PROXY)
class Proxy implements IProxy {
    async execute(
        options: IreqObj,
        ...reqBody: any[]
    ): Promise<any> {
        const [headers, uri, method , gzip] = [options.headers, options.uri, options.method, options.gzip || false]
        const reqObj: IreqObj = { headers, uri, method };
        if (gzip) {
            reqObj.gzip = true;
        }
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            if (reqBody[1]) {
                reqObj.json = reqBody[0];
            } else {
                reqObj.json = {};
            }
        }
        try{
            const response = await got(reqObj.uri, reqObj);
            const parsedBody = JSON.parse(response.body);
            if (response.statusCode.toString()[0] !== '2') {
                const error = {
                    error: {
                        statusCode: response.statusCode,
                        response: parsedBody
                    },
                };
                throw(error);
            }else{
                return parsedBody;
            }
        }catch(err){
            const error: IApiError = {
                statusCode: err.statusCode || 500,
                code: err.statusCode || 500,
                message: 'error in response',
                developerMessage: err.statusMessage,
            };
            throw (error);
        }
    }
}