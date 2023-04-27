import { encode } from "../../utils/bearer.util";
import { comparePassword } from "../../utils/hash.util";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private userRepository = new UserRepository();
  private authService = new AuthService();

  login(auth: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const isValid = this.authService.validateLogin(auth);

        if (!isValid.valid) throw isValid.message;

        const findedUser = await this.userRepository.findUser({
          email: auth.email,
        });

        const PasswordIsValid = await comparePassword(
          auth.password,
          findedUser.password
        );

        let bearer = "";

        if (PasswordIsValid) {
          bearer = encode({
            id: findedUser.id,
            name: findedUser.name,
            email: findedUser.email,
          });
        } else {
          throw "Invalid credentials";
        }

        resolve(bearer);
      } catch (err) {
        reject(err);
      }
    });
  }
}
