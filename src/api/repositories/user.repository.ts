import { I_DataUser, I_User } from "../../interfaces/user.interface";
import { hashPassword } from "../../utils/hash.util";
import User from "../models/user.model";

export class UserRepository {
  findUsers(): Promise<I_DataUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const users: any = await User.findAll();

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  findUserById(id: number): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await User.findByPk(id);

        if (!user) throw { err: "User does not exist", status: 404 };

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  findUser(user: any): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const findedUser: any = await User.findOne({ where: { ...user } });

        if (!findedUser) throw { err: "User does not exist", status: 404 };

        resolve(findedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  createUser(user: I_User): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user.email) throw "'email' not informed";

        if (!user.name) throw "'name' not informed";

        if (!user.password) throw "'password' not informed";

        const hashedPassword = await hashPassword(user.password);

        const createdUser: any = await User.create({
          name: user.name,
          password: hashedPassword,
          email: user.email,
        });

        await createdUser.reload();

        resolve(createdUser);
      } catch (err) {
        if (err?.name == "SequelizeUniqueConstraintError")
          err = { err: "Email already in use", status: 409 };

        reject(err);
      }
    });
  }

  updateUser(id: number, user: I_User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.findUserById(id);

        if (!user.email && !user.name && !user.password)
          throw "No information was given to update";

        const updatedUser: any = await User.update(user, { where: { id } });

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedUser: any = await User.destroy({
          where: {
            id,
          },
        });

        if (deletedUser == 0) throw { err: "User does not exist", status: 404 };

        resolve(deletedUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}
