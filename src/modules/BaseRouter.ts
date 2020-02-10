import { Router } from 'express';
import { inject } from 'inversify';
import { USERROUTE, BASEROUTE } from '../const/types';
import { IRouter } from './IRouter';
import { provide } from 'inversify-binding-decorators';

// Init router and path
const router = Router();

// Add sub-route
@provide(BASEROUTE)
class BaseRouter implements IRouter{
    @inject(USERROUTE) userRouter!: IRouter;
    
    get routes(){
        router.use('/users', this.userRouter.routes);
        return router;
    }
}
