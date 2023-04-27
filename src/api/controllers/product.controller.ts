import { I_DataProduct, I_Product } from "../../interfaces/product.interface";
import { ProductRepository } from "../repositories/product.repository";

export class ProductController {
  private productRepository = new ProductRepository();

  findProducts(): Promise<I_DataProduct[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await this.productRepository.findProducts();

        resolve(products);
      } catch (err) {
        reject(err);
      }
    });
  }

  findProductById(id: number): Promise<I_DataProduct> {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.productRepository.findProductById(id);

        resolve(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  createProduct(product: I_Product): Promise<I_DataProduct> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdProduct = await this.productRepository.createProduct(
          product
        );

        resolve(createdProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateProduct(id: number, product: I_Product): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedProduct = await this.productRepository.updateProduct(
          id,
          product
        );

        resolve(updatedProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteProduct(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedProduct = await this.productRepository.deleteProduct(id);

        resolve(deletedProduct);
      } catch (err) {
        reject(err);
      }
    });
  }
}
