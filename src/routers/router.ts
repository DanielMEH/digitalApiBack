import { Router } from "express";
import { controllers } from "../controllers/controllers";
import jsonapp from "../data/app.json"
import { authorizeJsonWebToken } from "../middleware/authorizationacessToken";
const router = Router()

let path = `${jsonapp.Config_data.schema}/${jsonapp.Config_data.path}` 
class RouterInitialize extends controllers {

    public postLogin() {

      return   router.post(path+ "/login", this.postLoginUser)
    }
    public postRegister() {
        return router.post(path+ "/register", this.postRegisteruser)
    }

    public getProfile() {
        return router.get(path+ "/profile", authorizeJsonWebToken.verifyAccessToken, this.getProfileUser)
    }

    public putProfile() {
        return router.put(path+ "/profile", authorizeJsonWebToken.verifyAccessToken, this.putProfileUser)
    }

    public deleteProfile() {
        return router.delete(path+ "/profile",authorizeJsonWebToken.verifyAccessToken, this.deleteProfileUser)
    }
}

export const routerInitialize = new RouterInitialize()