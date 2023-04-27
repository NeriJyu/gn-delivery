import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { handleError } from "../../utils/err.util";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/", async (req, res) => {
  try {
    const auth = req.body;

    const login = await authController.login(auth);

    res.status(200).send({
      status: "SUCCESS",
      data: login,
    });
  } catch (err) {
    handleError(err, res, "There was an error when authenticate");
  }
});

export default authRouter;
