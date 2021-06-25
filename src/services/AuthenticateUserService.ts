import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, getRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email or Password is incorrect!");
        }

        const passwordMatch = compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email or Password is incorrect!");

        }

        const token = sign({
            email: user.email,
        }, "eaa978157f3c67a75e8770ec82873394", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }

}

export { AuthenticateUserService };