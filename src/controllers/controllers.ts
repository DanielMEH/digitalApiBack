import { Request, Response } from 'express';
import { usersData } from '../interface/usersData';
import { dbacess } from '../dbacess/dbacess';
import { encripte } from '../utils/cryptopasskey';
import { authorizeJsonWebToken } from '../middleware/authorizationacessToken';
const accesdb = new dbacess()

export class controllers  {

    public async postLoginUser<T>(req: Request, res: Response)  {
        const {email, password} = req.body

        if(email === "" && password === ""){
            return res.status(422).json({message: "Email and password are required"})
        }
            return await accesdb.getLoginUserdb<usersData>(email, password).then(async(data) => {

                if(await encripte.comparePassword(password, data[0].password)){
                   let acessToken = await authorizeJsonWebToken.createAccessToken(data[0])
                    return   res.status(200).json({message: "User logged", body: { acessToken}})
                }
                return  res.status(422).json({message: "User not logged"})
            }).catch((error) => {
              return  res.status(500).json(error)
            })
    }

    public async postRegisteruser(req: Request, res: Response) {

        try {
            let {email, password} = req.body

            if(email === "" && password === ""){
            res.status(422).json({message: "Email and password are required"})
            }else{
            let data =  await accesdb.postRegisterUserdb<usersData>(email, await encripte.encriptePassword(password) )
     
            return res.status(200).json({message: "User created", body:data})


        }
        
        } catch (error) {
           return res.status(500).json({message: "Error",error: error}) 
        }
    }


    public async getProfileUser(req: any, res: Response) {
        
        try {
            let ID = req.user.id
            const data = await accesdb.getProfileUserdb<usersData>(ID)
            return res.status(200).json({message: "User profile", body: data})
        } catch (error) {
            return res.status(500).json({message: "Error",error: error})
        }
    }

    public async putProfileUser(req: any, res: Response) {
        try {
            const data = await accesdb.putProfileUserdb<usersData>(req.user.id, req.body)
            return res.status(200).json({message: "User updated", body: data})
        } catch (error) {
            return res.status(500).json({message: "Error",error: error})
        }
    }

    public async deleteProfileUser(req: any, res: Response) {
        try {
            await accesdb.deleteProfileUserdb(req.user.id)
            return res.status(200).json({message: "User deleted", body: []})
        } catch (error) {
            console.log("🚀 ~ controllers ~ deleteProfileUser ~ error:", error)
            return res.status(500).json({message: "Error",error: error})
        }
    }
}