import { compare, hash } from 'bcrypt'

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = 10;
    return hash(password, salt);
}

export const checkPassword = async (password: string, hashPassowrd: string,): Promise<boolean> => {
    return compare(password, hashPassowrd);
}