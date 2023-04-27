import express from "express";
import { handleError } from "../../utils/err.util";
import { DeliveryController } from "../controllers/delivery.controller";
import { I_Delivery } from "../../interfaces/delivery.interface";
import { decode } from "../../utils/bearer.util";
import { I_AuthUser } from "../../interfaces/user.interface";

const deliveryRouter = express.Router();
const deliveryController = new DeliveryController();

deliveryRouter.get("/", async (req, res) => {
  try {
    const deliveries = await deliveryController.findDeliveries();

    res.status(200).send({
      status: "SUCCESS",
      data: deliveries,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding deliveries");
  }
});

deliveryRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const delivery = await deliveryController.findDeliveryById(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: delivery,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding delivery");
  }
});

deliveryRouter.post("/", async (req, res) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];
    const decodedBearer: any = decode(token);
    const authUser: I_AuthUser = decodedBearer.value;

    const delivery = req.body;

    const createdDelivery = await deliveryController.createDelivery(
      delivery,
      authUser
    );

    res.status(201).send({
      status: "SUCCESS",
      data: createdDelivery,
    });
  } catch (err) {
    handleError(err, res, "There was an error creating delivery");
  }
});

deliveryRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delivery: I_Delivery = req.body;

    const updatedUser = await deliveryController.updateDelivery(
      Number(id),
      delivery
    );

    res.status(200).send({
      status: "SUCCESS",
      data: updatedUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error updating delivery");
  }
});

deliveryRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await deliveryController.deleteDelivery(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: deletedUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error deleting delivery");
  }
});

export default deliveryRouter;
