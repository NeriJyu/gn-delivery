import { I_DataUser, I_User } from "../../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  private userRepository = new UserRepository();

  findUsers(): Promise<I_DataUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.userRepository.findUsers();

        resolve(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  findUserById(id: number): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findUserById(id);

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  findUser(user: I_User): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const findedUser = await this.userRepository.findUser(user);

        resolve(findedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  createUser(user: I_User): Promise<I_DataUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdUser = await this.userRepository.createUser(user);

        resolve(createdUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateUser(id: number, user: I_User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await this.userRepository.updateUser(id, user);

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedUser = await this.userRepository.deleteUser(id);

        resolve(deletedUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}
