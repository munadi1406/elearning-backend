import { Users } from './schema/Users';
import { generateAccessToken } from '../services/jwtService';
import {verifyRefreshToken} from './../services/jwtService'


export const newAccessToken = async (refreshToken: string): Promise<object> => {
    try {
        const jwtCheck = verifyRefreshToken(refreshToken);
        if (!jwtCheck) return { status: false };
        
        const checkRefreshToken: any = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!checkRefreshToken) {
            return { status: false }
        }

        const { id_users, username, role, image } = checkRefreshToken
        const payloadAccessToken = {
            id_users,
            username,
            role,
            image
        }
        const newAccessTokenJwt = generateAccessToken(payloadAccessToken)
        return { status: true, accessToken: newAccessTokenJwt }
    } catch (error) {
        console.log(error);
        return { status: false }
    }
};