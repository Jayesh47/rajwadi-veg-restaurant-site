import { hash, genSalt, compare } from 'bcrypt';
import { Users } from "@/app/apis/lib/users";
import { sign, verify } from 'jsonwebtoken';

export const encryptPassword = async (password: string) => {
    try {
        const _salt = (await genSalt(10));
        return (await hash(password, _salt));
    } catch (err) {
        console.log(err);
    }
}

export const userExists = async (useremail: string) => {
    try {
        if (useremail) {
            const isuser = await Users.findOne({ email: useremail.toString() });
            if (isuser) {
                return true;
            } else {
                return false;
            }
        }else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export const tokenGenerate = async (user: Object) => {
    try {
        // console.log(user);
        if (user && process.env.SECRET_KEY) {
            const payload = sign(user, process.env.SECRET_KEY, { 'expiresIn': '7d' });
            return payload;
        }
    } catch (err) {
        console.log(err);
    }
}

export const checkPassword = async (userPassword: string, encryptPassword: string) => {
    try {
        return await compare(userPassword, encryptPassword);
    } catch (err) {
        console.log(err);
        console.log(">>> error generate in checking password.");
    }
}

export const verifyToken = (token: string) => {
    try {
        if (process.env.SECRET_KEY && token) {
            return verify(token, process.env.SECRET_KEY);
        }
    } catch (err) {
        return "error found in verifying token.";
    }
}