import express from "express";
import { handleError } from "../../utils/err.util";
import { ProductController } from "../controllers/product.controller";
import { I_Product } from "../../interfaces/product.interface";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", async (req, res) => {
  try {
    const type: string = req.query.type as string;

    const products = await productController.findProducts(type);

    res.status(200).send({
      status: "SUCCESS",
      data: products,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding products");
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productController.findProductById(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: product,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding product");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product: I_Product = req.body;

    const createdProduct = await productController.createProduct(product);

    res.status(201).send({
      status: "SUCCESS",
      data: createdProduct,
    });
  } catch (err) {
    handleError(err, res, "There was an error creating product");
  }
});

productRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product: I_Product = req.body;

    const updatedProduct = await productController.updateProduct(
      Number(id),
      product
    );

    res.status(200).send({
      status: "SUCCESS",
      data: updatedProduct,
    });
  } catch (err) {
    handleError(err, res, "There was an error updating product");
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await productController.deleteProduct(Number(id));

    res.status(200).send({
      status: "SUCCESS",
      data: deletedProduct,
    });
  } catch (err) {
    handleError(err, res, "There was an error deleting product");
  }
});

export default productRouter;
