import express from "express";
import { CouponController } from "../controllers/coupon.controller";
import { I_Coupon } from "../../interfaces/coupon.interface";
import { handleError } from "../../utils/err.util";

const couponRouter = express.Router();
const couponController = new CouponController();

couponRouter.get("/", async (req, res) => {
  try {
    const coupons = await couponController.findCoupons();

    res.status(200).send({
      status: "SUCCESS",
      data: coupons,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding coupons");
  }
});

couponRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const coupon = await couponController.findCouponById(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: coupon,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding coupon");
  }
});

couponRouter.post("/", async (req, res) => {
  try {
    const coupon: I_Coupon = req.body;

    const createdCoupon = await couponController.createCoupon(coupon);

    res.status(201).send({
      status: "SUCCESS",
      data: createdCoupon,
    });
  } catch (err) {
    handleError(err, res, "There was an error creating coupon");
  }
});

couponRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coupon: I_Coupon = req.body;

    const updatedCoupon = await couponController.updateCoupon(
      Number(id),
      coupon
    );

    res.status(200).send({
      status: "SUCCESS",
      data: updatedCoupon,
    });
  } catch (err) {
    handleError(err, res, "There was an error updating coupon");
  }
});

couponRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedCoupon = await couponController.deleteCoupon(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: deletedCoupon,
    });
  } catch (err) {
    handleError(err, res, "There was an error deleting coupon");
  }
});

export default couponRouter;
