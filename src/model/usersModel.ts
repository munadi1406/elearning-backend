import { checkPassword, encryptPassword } from "../services/passwordHash";
import { createOtp } from "./otpModel";
import { generateAccessToken, generateRefreshToken } from "../services/jwtService";
import { join } from "path";
import { createReadStream, existsSync, unlinkSync } from "fs";
import { Users } from "./schema/Users";


interface payloadRegister {
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
} 
export const register = async (data: payloadRegister):Promise<any> => {
    try {
        const { username, email, phoneNumber, password, confirmPassword } = data;

        // Cek apakah email sudah digunakan
        const emailCheck = await Users.findOne({
            where: {
                email,
            },
            attributes: ['email'],
        });

        if (emailCheck) {
            return { status: false, message: "Email sudah digunakan" };
        }

        // Cek apakah password dan konfirmasi password sama
        if (password !== confirmPassword) {
            return { status: false, message: "Password dan konfirmasi password tidak sama" };
        }

        // Enkripsi password
        const passwordHash = await encryptPassword(password);

        // Buat pengguna baru
        const user:any = await Users.create({
            username,
            email,
            phoneNumber,
            password: passwordHash,
        });
        await createOtp(user.id_users, email);
        // Lakukan tindakan lain yang diperlukan, misalnya membuat OTP

        return user;
    } catch (error) {
        throw error;
    }
};

export const login = async (email: string, passwordAuth: string): Promise<any> => {
    try {
        const findUsers: any = await Users.findOne({
            where: {
                email,
                status: "active",
            },
        });

        if (!findUsers) {
            return { status: false, message: "Akun Tidak Ditemukan" };
        }

        const { password, id_users, role, username,image } = findUsers;

        // Memeriksa apakah password sesuai
        const checkPasswordAuth = await checkPassword(passwordAuth, password);

        if (!checkPasswordAuth) {
            return { status: false, message: "Password yang Anda masukkan salah" };
        }
        // Generate access token dan refresh token
        const accessToken = generateAccessToken({ id_users, role, username });
        const refreshToken = generateRefreshToken({ id_users, role, username,image });

        // Update refresh token pada pengguna
        await Users.update(
            {
                refresh_token: refreshToken,
            },
            {
                where: {
                    id_users,
                },
            }
        );

        return { status: true, message: "Login Berhasil", data: { accessToken, refreshToken } };
    } catch (error) {
        throw error;
    }
};


export async function logoutt(idUsers: number): Promise<boolean> {
    try {
        // Cek apakah pengguna ada berdasarkan id_users
        const checkUsers = await Users.findOne({
            where: {
                id_users: idUsers,
            },
        });

        if (!checkUsers) {
            return false;
        }

        // Update refresh_token menjadi null
        await Users.update(
            {
                refresh_token: null,
            },
            {
                where: {
                    id_users: idUsers,
                },
            }
        );

        return true;
    } catch (error) {
        throw error;
    }
}


export const uploadProfileImage = async (id_users: number, image: string) => {
    try {
        // Temukan pengguna berdasarkan id_users
        const user: any = await Users.findByPk(id_users);

        if (!user) {
            throw new Error("Pengguna tidak ditemukan");
        }

        // Hapus gambar profil lama jika ada
        if (user.image) {
            const imagePath = join(__dirname, `../uploads/users/${id_users}/${user.image}`);
            try {
                unlinkSync(imagePath);
            } catch (unlinkError) {
                console.error(`Gagal menghapus gambar: ${unlinkError}`);
            }
        }

        // Update kolom 'image' di tabel Users dengan gambar yang baru
        await user.update({
            image: image || '',
        });

        return true;
    } catch (error) {
        throw error;
    }
};


export const streamImage = async (id_users: string, imageName: string) => {
    try {
        const imagePath = join(__dirname, `../uploads/users/${id_users}/${imageName}`);
        if (!existsSync(imagePath)) {
            return { status: false };
        }
        return createReadStream(imagePath);
    } catch (error) {
      console.log(error)
        throw error;
    }
};