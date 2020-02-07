import { Request, Response, Router, Express } from 'express';
import { IRouter } from '../../IRouter';
import { provide } from 'inversify-binding-decorators';
import { USERROUTE } from '../../../const/types';

const router = Router();

@provide(USERROUTE)
export class UserRouter implements IRouter{
    get routes(){
        router.get('/', async (req: Request, res: Response) => {
            try {
                console.log('this hits and returns')
                return res.send('come on bru');
            } catch (err) {
                throw err;
            }
        });
        return router;
    }
}