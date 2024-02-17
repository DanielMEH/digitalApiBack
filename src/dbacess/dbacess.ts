import { callApi } from "./apicall"

export class dbacess extends callApi {
    public async getLoginUserdb<T>(email: string, password: string) {
        let params = "?q="+JSON.stringify({email})
         let column = "&columns=password,email,state,creationdate,id"

         params += column


         console.log(params)
        return this.apifetchDb({email, password}, "GET", "USERS", "USERS", params);
    }
    public async postRegisterUserdb<T>(email: string, password: string) {
        return this.apifetchDb({email, password}, "POST", "USERS", "USERS", null);
    }

    public async getProfileUserdb<T>(id: string) {
        let params = "?q="+JSON.stringify({id})
        params 
        return this.apifetchDb({}, "GET", "USERS", "GET_USERS_DATA_VIEW", params);
    }

    public async putProfileUserdb<T>(id:string, body: T) {
        let params = "?q="+JSON.stringify({id})
        params 
        return this.apifetchDb(body, "PUT", "USERS", "USERS", params);
    }

    public async deleteProfileUserdb<T>(id:string) {
        let params = "?q="+JSON.stringify({id})
        params 
        return this.apifetchDb({}, "DELETE", "USERS", "USERS", params);
    }
}