import express from "express";
import { UserController } from "../controllers/user.controller";
import { I_User } from "../../interfaces/user.interface";
import { handleError } from "../../utils/err.util";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userController.findUsers();

    res.status(200).send({
      status: "SUCCESS",
      data: users,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding users");
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userController.findUserById(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: user,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding user");
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user: I_User = req.body;

    const createdUser = await userController.createUser(user);

    res.status(201).send({
      status: "SUCCESS",
      data: createdUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error creating user");
  }
});

userRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user: I_User = req.body;

    const updatedUser = await userController.updateUser(Number(id), user);

    res.status(200).send({
      status: "SUCCESS",
      data: updatedUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error updating user");
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await userController.deleteUser(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: deletedUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error deleting user");
  }
});

export default userRouter;
