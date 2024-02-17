import jwt from 'jsonwebtoken';
import { Constanst } from '../utils/Constant';

 class AuthorizationTokens {
  
     async createAccessToken(payload: object): Promise<string> {
        
        let envProcessToken = process.env.TOKEN_SECRET
        if(envProcessToken === undefined){
            envProcessToken = Constanst.ACCESS_TOKEN_SECRET
        }

        return jwt.sign(payload, envProcessToken, {expiresIn: '15h'});
    }

    async verifyAccessToken(req: any, res: any, next: any) {
    
        const authHeader = req.headers['authorization'];
        const token = authHeader
        if (token == null) return res.status(401).json({message: "Token not found"});

        jwt.verify(token, Constanst.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
            
            if (err) return res.status(403).json({message: "Token not valid"});
            req.user = user;
            next();
        });
    }

}


export const  authorizeJsonWebToken = new AuthorizationTokens();