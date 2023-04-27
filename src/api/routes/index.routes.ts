import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../../docs/swagger.json";
import userRouter from "./user.routes";
import productRouter from "./product.routes";
import couponRouter from "./coupon.routes";
import authRouter from "./auth.routes";
import deliveryRouter from "./delivery.routes";

const router = express.Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/products", productRouter);

router.use("/coupons", couponRouter);

router.use("/deliveries", deliveryRouter);

export default router;
