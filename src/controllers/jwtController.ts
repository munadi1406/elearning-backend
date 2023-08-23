import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { newAccessToken } from "../model/jwtModel";



export const reqNewAccessToken = async (req:Request,res:Response)=>{
    const newAccessTokenValidation = [
        body('refreshToken').isJWT().withMessage("Refresh Token Tidak Valid")
      ];
      try {
        console.log(req.body.refreshToken);
        await Promise.all(newAccessTokenValidation.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map(error => error.msg);
          return res.status(400).json({ message: errorMessages });
        }
        const {refreshToken } = req.body;
        const newAccessTokenData: any = await newAccessToken(refreshToken);
        if(newAccessTokenData.status){
            return res.status(200).json({statusCode:200,accessToken:newAccessTokenData.accessToken})
        }else{
            return res.status(404).json({statusCode:403,message:"Sesi Anda Telah Habis"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({statusCode:500,message:"Internal Server Error"});
    }
}