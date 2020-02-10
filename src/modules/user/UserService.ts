import { inject } from "inversify";
import { PROXY, USER_SERVICE } from '../../const/types';
import { IProxy, IreqObj } from "../../utility/proxy.interface";
import { provide } from "inversify-binding-decorators";
import { IUserService } from "./IUserService";

@provide(USER_SERVICE)
class UserService implements IUserService{
    @inject(PROXY) private proxyService!: IProxy;

    async getRandomTest(): Promise<Object>{
        try{
            let options: IreqObj = {
                uri:'https://breaking-bad-quotes.herokuapp.com/v1/quotes',
                method: 'GET',
                headers: {}
            }
            let response = await this.proxyService.execute(options, []);
            return response;
        }catch(error){
            console.log(error);
            return error;
        }
    }
}