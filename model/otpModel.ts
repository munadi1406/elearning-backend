import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { sendEmail } from "../services/emailService";


export const createOtp = async (idUsers: number, email: string) => {
  try {
    const otp = generateRandomNumber();
    const otpExp = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 menit
    const data = {
      id_users: idUsers,
      otp: `${otp}`,
      otp_expires: `${otpExp}`,
    };
    await sendEmail(otp, email);
    await prisma.otp.create({ data });
  } catch (error) {
    throw error;
  }
};

export const otpAuth = async (otp: string) => {
  try {
    const dataOtp = await prisma.otp.findFirst({
      where: {
        otp: `${otp}`
      },
    });
    if (!dataOtp) return { status: false, message: "OTP Tidak Valid" };
    const { id_otp, id_users, otp_expires } = dataOtp;
    const compare = compareDate(otp_expires);
    if (compare) {
      await prisma.users.update({
        where: {
          id_users,
        },
        data: {
          status: 'active',
        },
      });
      await prisma.otp.delete({
        where: {
          id_otp,
        },
      });
      return { status: false, message: "Verfikasi OTP Berhasil" };
    }
    return { status: false, message: "OTP Sudah Tidak Berlaku Silahkan Minta OTP Baru" };
  } catch (error) {
    throw error;
  }
};


export const newOtp = async (emailData: string): Promise<any> => {
  console.log({emailData})
  try {
    const dataOtp: any = await prisma.otp.findFirst({
      select: {
        id_otp:true,
        otp: true,
        Users: {
          select: {
            email: true,
          },
        },
        otp_expires: true,
      },
      where: {
        Users: {
          email: emailData,
        },
      },
    });
    if (!dataOtp) return {status:false,message:"Email Tidak Di temukan"};
    console.log(dataOtp);

    const { id_otp, Users, otp_expires } = dataOtp;
    const { email } = Users;

    const newOtp = generateRandomNumber();
    const newOtpExp = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 menit
    const compare = compareDate(otp_expires);
    console.log(compare)
    if (compare) return {status:false,message:"kode otp sebelumnya masih bisa digunakan"};
    await prisma.otp.update({
      where: {
        id_otp, 
      },
      data: {
        otp: `${newOtp}`,
        otp_expires: newOtpExp,
      },
    });
    await sendEmail(newOtp, email);
    return {status:true,message:`Kode Otp Baru Sudah Dikirim Ke ${email}`};
  } catch (error) {
    throw error;
  }
};





const compareDate = (otpExp: Date): boolean => {
  const dateNow = new Date();
  if (dateNow > otpExp) {
    return false;
  } else {
    return true;
  }
}

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 1000000);
};
