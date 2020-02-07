import { receptacle } from '../container';
import { Router } from 'express';
import { Container } from 'inversify';
import { USERROUTE, BASEROUTE } from '../const/types';
import { IRouter } from './IRouter';
import { provide } from 'inversify-binding-decorators';

// Init router and path
const router = Router();

// Add sub-route
@provide(BASEROUTE)
export default class BaseRouter implements IRouter{
    get routes(){
        const container: Container = receptacle.getContainer;
        const userRouter: IRouter = container.get(USERROUTE); 
        router.use('/users', userRouter.routes);
        return router;
    }
}
