import {
  I_DataProduct,
  I_Product,
  I_UpdateProduct,
} from "../../interfaces/product.interface";
import Product from "../models/product.model";

export class ProductRepository {
  findProducts(type?: string): Promise<I_DataProduct[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let products: any;

        if (type)
          products = await Product.findAll({
            order: [["name", "ASC"]],
            where: { type },
          });
        else
          products = await Product.findAll({
            order: [["name", "ASC"]],
          });

        resolve(products);
      } catch (err) {
        reject(err);
      }
    });
  }

  findProductsByIds(ids: number[]): Promise<I_DataProduct[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const products: any = await Product.findAll({
          where: { id: ids },
        });

        if (ids.length != products.length) throw "Some product does not exist";

        resolve(products);
      } catch (err) {
        reject(err);
      }
    });
  }

  findProductById(id: number): Promise<I_DataProduct> {
    return new Promise(async (resolve, reject) => {
      try {
        const product: any = await Product.findByPk(id);

        if (!product) throw { err: "Product does not exist", status: 404 };

        resolve(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  createProduct(product: I_Product): Promise<I_DataProduct> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!product.price) throw "'price' not informed";

        if (!product.name) throw "'name' not informed";

        if (!product.type) throw "'type' not informed";

        const createdProduct: any = await Product.create({ ...product });

        await createdProduct.reload();

        resolve(createdProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateProduct(id: number, product: I_UpdateProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.findProductById(id);

        if (
          !product.description &&
          !product.name &&
          !product.price &&
          !product.quantity &&
          !product.type
        )
          throw "No information was given to update";

        const updatedProduct: any = await Product.update(product, {
          where: { id },
        });

        resolve(updatedProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateProductsQuantity(
    products: I_DataProduct[],
    quantity: number[]
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i = 0; i < products.length; i++) {
          if (products[i].quantity && products[i].quantity > 0) {
            await this.updateProduct(products[i].id, {
              quantity: products[i].quantity - quantity[i],
            });
          }
        }

        resolve("OK");
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteProduct(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedProduct: any = await Product.destroy({
          where: {
            id,
          },
        });

        if (deletedProduct == 0)
          throw { err: "Product does not exist", status: 404 };

        resolve(deletedProduct);
      } catch (err) {
        reject(err);
      }
    });
  }
}
