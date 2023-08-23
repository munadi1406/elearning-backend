import { sign,verify ,JwtPayload} from 'jsonwebtoken'



const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET_KEY ?? 'mkasdmkasdmad';
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET_KEY ?? 'okeajanihasdasdk';
export const generateAccessToken = (data: object): string => {
    return sign(
        data, accessTokenSecret, { expiresIn: "15m", }
    );
}

export const generateRefreshToken =  (data: object): string => {
    return sign(
        data, refreshTokenSecret, { expiresIn: "7d", }
    );
}


export const verifyAccessToken = (token: string): JwtPayload | string =>{
    return verify(token,accessTokenSecret);
}

export const verifyRefreshToken  = (token: string): JwtPayload|string => {
    return verify(token,refreshTokenSecret);
}