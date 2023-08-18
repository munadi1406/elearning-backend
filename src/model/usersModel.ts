import { PrismaClient } from "@prisma/client";
import { checkPassword, encryptPassword } from "../services/passwordHash";
import { createOtp } from "./otpModel";
import { generateAccessToken, generateRefreshToken } from "../services/jwtService";
import { join } from "path";
import { createReadStream,existsSync,unlinkSync } from "fs";

const prisma = new PrismaClient()

interface payloadRegister {
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}
export const register = async (data: payloadRegister): Promise<any> => {
    try {
        const { username, email, phoneNumber, password, confirmPassword } = data;
        const emailCheck = await prisma.users.findUnique({
            where: { email },
            select: { email: true },
        });
        if (emailCheck) {
            return { status: false, message: "email sudah digunakan" };
        }
        if (password !== confirmPassword) {
            return { status: false, message: "Password dan konfirmasi password tidak sama" }
        }
        const passwordHash = await encryptPassword(password);
        const user = await prisma.users.create({
            data: {
                username,
                email,
                phoneNumber,
                password: passwordHash,
            },
        });
        await createOtp(user.id_users, email);
        return user
    } catch (error) {
        throw error;
    }
}

export const login = async (email: string, passwordAuth: string): Promise<any> => {
    try {
        const findUsers: any = await prisma.users.findFirst({
            where: {
                email, status: "active"
            }
        })
        if (!findUsers) return { status: false, message: "Akun Tidak Di Temukan" }
        const { password, id_users, role, username } = findUsers;
        const checkPasswordAuth = await checkPassword(passwordAuth, password)
        if (!checkPasswordAuth) return { status: false, message: "Password Yang Anda Masukkan Salah" }
        const accesstoken = generateAccessToken({ id_users, role, username })
        const refreshToken = generateRefreshToken({ id_users, role, username })

        await prisma.users.update({
            where: {
                id_users
            },
            data: {
                refresh_token: refreshToken
            }
        })
        return { status: true, message: "Login Berhasil", data: { accesstoken, refreshToken } }
    } catch (error) {
        throw error;
    }
}


export async function logoutt(idUsers: number): Promise<boolean> {
    try {
        const checkUsers = await prisma.users.findFirst({
            where: {
                id_users: idUsers,
            },
        });

        if (!checkUsers) return false;

        await prisma.users.update({
            where: {
                id_users: idUsers,
            },
            data: {
                refresh_token: null,
            },
        });

        return true;
    } catch (error) {
        throw error;
    }
}

export const uploadProfileImage = async (id_users: number, image: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id_users,
            },
        });
        if (user?.image) {
            const imagePath = join(__dirname, `../uploads/users/${id_users}/${user.image}`);
            try {
                unlinkSync(imagePath);
            } catch (unlinkError) {
                console.error(`Failed to delete image: ${unlinkError}`);
            }
        }
        await prisma.users.update({
            where: {
                id_users,
            },
            data: {
                image: image || '',
            },
        });

        return true;
    } catch (error) {
        throw error;
    }
};


export const streamImage = async (id_users:string,imageName:string) => {
    try {
        const imagePath = join(__dirname, `../uploads/users/${id_users}/${imageName}`);
        if(!existsSync(imagePath)){
            return {status:false};
        }
        return createReadStream(imagePath);
    } catch (error) {
        throw error;
    }
};