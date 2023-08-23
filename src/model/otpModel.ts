import { sendEmail } from "../services/emailService";
import { Otp } from "./schema/Otp";
import { Users } from "./schema/Users";


export const createOtp = async (idUsers: number, email: string) => {
  try {
    const otp = generateRandomNumber();
    const otpExp = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 menit
    const data = {
      id_users: idUsers,
      otp: `${otp}`,
      otp_expires: `${otpExp}`,
    };

    // Kirim email (Anda perlu menggantinya dengan implementasi pengiriman email Anda)
    await sendEmail(otp, email);

    // Buat record OTP menggunakan model Otp
    await Otp.create(data);
  } catch (error) {
    throw error;
  }
};

export const otpAuth = async (otp: string) => {
  try {
    const dataOtp:any = await Otp.findOne({
      where: {
        otp: `${otp}`
      },
    });
    
    if (!dataOtp) return { status: false, message: "OTP Tidak Valid" };
    
    const { id_otp, id_users, otp_expires } = dataOtp;
    const compare = compareDate(otp_expires);

    if (compare) {
      await Users.update({
        status: 'active',
      }, {
        where: {
          id_users,
        },
      });
      
      await Otp.destroy({
        where: {
          id_otp,
        },
      });
      
      return { status: true, message: "Verifikasi OTP Berhasil" };
    }
    
    return { status: false, message: "OTP Sudah Tidak Berlaku Silahkan Minta OTP Baru" };
  } catch (error) {
    throw error;
  }
};



export const newOtp = async (emailData: string): Promise<any> => {
  try {
    const dataOtp: any = await Otp.findOne({
      attributes: ['id_otp', 'otp', 'otp_expires'],
      include: {
        model: Users,
        attributes: ['email'],
        as:'user',
        where: {
          email: emailData,
        },
      },
    });
    if (!dataOtp) return { status: false, message: "Email Tidak Ditemukan" };
    const { id_otp, otp, otp_expires, user } = dataOtp;
    const { email } = user;
    console.log({email});

    const newOtp = generateRandomNumber();
    const newOtpExp = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 menit
    const compare = compareDate(otp_expires);

    if (compare) return { status: false, message: "Kode OTP sebelumnya masih bisa digunakan" };

    await Otp.update(
      {
        otp: `${newOtp}`,
        otp_expires: newOtpExp,
      },
      {
        where: {
          id_otp,
        },
      }
    );

    await sendEmail(newOtp, email);
    
    return { status: true, message: `Kode OTP Baru Sudah Dikirim Ke ${email}` };
  } catch (error) {
    console.log(error);
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
