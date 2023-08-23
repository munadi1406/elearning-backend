import { Request, Response } from "express";
import { body, validationResult } from 'express-validator'
import { login, logoutt, register, streamImage, uploadProfileImage } from "../model/usersModel";
import { MulterError } from "multer";
import upload from "../services/multerProfileService";

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const createUserValidationRules = [
    body('username')
      .notEmpty().withMessage("Username harus diisi")
      .isLength({ min: 6 }).withMessage("Username minimal 6 karakter")
      .isString().withMessage('Username harus berupa string'),

    body('email')
      .isEmail().withMessage('Format email tidak valid'),

    body('phoneNumber')
      .notEmpty().withMessage('Nomor telepon harus diisi')
      .isMobilePhone('id-ID').withMessage('Format nomor telepon tidak valid'),

    body('password')
      .notEmpty().withMessage('Password harus diisi')
      .isStrongPassword().withMessage('Password harus lebih kuat'),

    body('confirmPassword')
      .notEmpty().withMessage('Konfirmasi password harus diisi')
  ];
  try {
    await Promise.all(createUserValidationRules.map(validationRule => validationRule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ message: errorMessages });
    }
    const registerr = await register(req.body);
    if (registerr.status) {
      return res.status(200).json({ statusCode: 201, message: `We have sent an email to your ${email} with a verification code. Please check your email and enter the OTP.`, })
    } else {
      return res.status(400).json({ statusCode: 400, message: registerr.message });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ statusCode: 500, error: "internal server error" });
  }
};

export const auth = async (req: Request, res: Response) => {
  const authValidationRules = [
    body('email')
      .notEmpty().withMessage("Masukkan Email Anda ")
      .isEmail().withMessage("Email Tidak Valid"),

    body('password')
      .notEmpty().withMessage('Masukkan Password Anda')
      .isStrongPassword().withMessage("Password Tidak Valid")

  ]
  try {
    await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ message: errorMessages });
    }
    const { email, password } = req.body
    const data = await login(email, password)
    if (data.status) {
      return res.status(200).json({ statusCode: 200, message: data.message, data: data.data })
    } else {
      return res.status(404).json({ statusCode: 404, message: data.message })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
  }
}


interface requestWithIdUsers extends Request {
  user?: number;
}
export const logout = async (req: requestWithIdUsers, res: Response) => {
  try {
    const idUsers = Number(req.user)
    const logoutUser = await logoutt(idUsers)
    if (logoutUser) {
      return res.status(200).json({ statusCode: 200, message: "Logout Berhasil" })
    } else {
      return res.status(200).json({ statusCode: 200, message: "Logout Berhasil" })
    }
  } catch (error) {
    return errorResponse(res)
  }
}

export const handleImageUpload = (req: Request, res: Response) => {
  try {
    upload(req, res, async (err: any) => {
      console.log(err);
      if (err instanceof MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ statusCode: 400, message: 'Ukuran file melebihi batas maksimum 5MB.' });
        }
      } else if (err) {
        return res.status(400).json({ statusCode: 400, message: 'Foto Harus Berupa Png, jpg, jpeg, webp.' });

      }

      await uploadPhotoProfileUser(req, res);
    });
  } catch (error) {
    console.log(error);
  }
}

const uploadPhotoProfileUser = async (req: requestWithIdUsers, res: Response) => {
  try {
    const idUsers:number  = Number(req.user)
    const imageName = req.file?.filename
    await uploadProfileImage(idUsers,`${imageName}`)
    return res.status(200).json({statusCode:200,message:"Foto Profile Berhasil Di Upload"})
  } catch (error) {
    console.log(error);
    return errorResponse(res)
  }
}


export const loadImageUsers = async (req: requestWithIdUsers, res: Response) => {
  try {
      const {idUsers,imageName} = req.params
      const image:any = await streamImage(idUsers,imageName)
      const ext = imageName.split(".");
      res.setHeader("Content-Type", `image/${ext[1]}`);
      image.pipe(res);
  } catch (error) {
    return res.sendStatus(404)
  }
}

const errorResponse = (res: Response) => {
  return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
}