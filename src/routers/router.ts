import express,{ Router } from "express";
import { controllers } from "../controllers/controllers";
import jsonapp from "../data/app.json"
import { authorizeJsonWebToken } from "../middleware/authorizationacessToken";

export class RouterInitialize extends controllers {
    // Tus métodos existentes...

    public initializeRoutes(): express.Router {
        const router = express.Router();
        const path = `/${jsonapp.Config_data.schema}/${jsonapp.Config_data.path}`;

        router.post(path + "/login", this.postLoginUser);
        router.post(path + "/register", this.postRegisteruser);
        router.get(path + "/profile", authorizeJsonWebToken.verifyAccessToken, this.getProfileUser);
        router.put(path + "/profile", authorizeJsonWebToken.verifyAccessToken, this.putProfileUser);
        router.delete(path + "/profile", authorizeJsonWebToken.verifyAccessToken, this.deleteProfileUser);

        return router;
    }
}