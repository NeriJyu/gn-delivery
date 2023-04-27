import {
  I_DataDelivery,
  I_Delivery,
} from "../../interfaces/delivery.interface";
import { I_AuthUser } from "../../interfaces/user.interface";
import { DeliveryRepository } from "../repositories/delivery.repository";
import { ProductRepository } from "../repositories/product.repository";
import { DeliveryService } from "../services/delivery.service";

export class DeliveryController {
  private deliveryRepository = new DeliveryRepository();
  private productRepository = new ProductRepository();
  private deliveryService = new DeliveryService();

  findDeliveries(): Promise<I_DataDelivery[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const deliveries = await this.deliveryRepository.findDeliveries();

        resolve(deliveries);
      } catch (err) {
        reject(err);
      }
    });
  }

  findDeliveryById(id: number): Promise<I_DataDelivery> {
    return new Promise(async (resolve, reject) => {
      try {
        const delivery = await this.deliveryRepository.findDeliveryById(id);

        resolve(delivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  createDelivery(
    delivery: { items: number[]; quantity: number[]; coupon: string },
    authUser: I_AuthUser
  ): Promise<I_DataDelivery> {
    return new Promise(async (resolve, reject) => {
      try {
        const isValid = this.deliveryService.validateCreateDelivery(delivery);

        if (!isValid.valid) throw isValid.message;

        const products = await this.productRepository.findProductsByIds(
          delivery.items
        );

        this.deliveryService.orderProducts(products, delivery.items);

        const isValidProductQuantity =
          this.deliveryService.validadeProductQuantity(
            products,
            delivery.quantity
          );

        if (!isValidProductQuantity.valid) throw isValidProductQuantity.message;

        let totalValue = await this.deliveryService.totalValue(
          products,
          delivery.quantity,
          delivery.coupon
        );

        const createdDelivery = await this.deliveryRepository.createDelivery({
          userId: authUser.id,
          status: "awaitingConfirmation",
          value: totalValue,
        });

        resolve(createdDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateDelivery(id: number, delivery: I_Delivery): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedDelivery = await this.deliveryRepository.updateDelivery(
          id,
          delivery
        );

        resolve(updatedDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteDelivery(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedDelivery = await this.deliveryRepository.deleteDelivery(
          id
        );

        resolve(deletedDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }
}
