import { body, validationResult } from "express-validator";
import { newOtp, otpAuth } from "../model/otpModel";
import { Request, Response } from "express";

export const otpAuthCheck = async (req: Request, res: Response) => {
    const otpValidationRules = [
        body('otp')
            .notEmpty().withMessage("OTP harus diisi")
            .isNumeric().withMessage("OTP tidak valid")
    ];

    try {
        await Promise.all(otpValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const { otp } = req.body
        const optCheck = await otpAuth(otp)
        if (optCheck.status) {
            return res.status(200).json({ statusCode: 200, message: optCheck.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: optCheck.message })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, message: "Internal server error" })
    }

}

export const newOtpReq = async (req: Request, res: Response) => {
    console.log("new otp running");
    const newotpValidationRules = [
        body('email')
            .notEmpty().withMessage("Email Harus Di Isi")
            .isEmail().withMessage("Email tidak Valid")
    ];

    try {
        await Promise.all(newotpValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const {email} = req.body;
        const otpp = await newOtp(email);
        if(otpp.status){
            return res.status(200).json({statusCode:200,message:otpp.message})
        }else{
            return res.status(400).json({statusCode:400,message:otpp.message})
        }

    } catch (error) {
        console.log(error);
    }
}