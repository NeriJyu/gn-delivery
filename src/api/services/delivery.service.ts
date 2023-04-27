import { I_DataProduct } from "../../interfaces/product.interface";
import { I_AuthUser } from "../../interfaces/user.interface";
import { CouponRepository } from "../repositories/coupon.repository";
import { ProductRepository } from "../repositories/product.repository";

export class DeliveryService {
  private productRepository = new ProductRepository();
  private couponRepository = new CouponRepository();

  orderProducts(products: I_DataProduct[], order: number[]): I_DataProduct[] {
    return products.sort((a: any, b: any) => {
      if (order.indexOf(a.id) < order.indexOf(b.id)) {
        return -1;
      } else if (order.indexOf(a.id) > order.indexOf(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  async totalValue(
    products: I_DataProduct[],
    quantity: number[],
    coupon?: string
  ): Promise<number> {
    let totalValue = 0;

    for (let i = 0; i < products.length; i++) {
      totalValue += products[i].price * quantity[i];
    }

    if (coupon) totalValue = await this.applyCoupon(coupon, totalValue);

    this.productRepository.updateProductsQuantity(products, quantity);

    return totalValue;
  }

  applyCoupon(coupon: string, totalValue: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const findedCoupon = await this.couponRepository.findCoupon({
          name: coupon,
        });

        if (!findedCoupon.percentage) {
          if (totalValue < findedCoupon.price)
            throw "Invalid price to use this coupon";

          totalValue = totalValue - findedCoupon.price;
        } else {
          let discount = findedCoupon.price * totalValue;
          discount = discount / 100;

          if (findedCoupon.maxPrice && discount > findedCoupon.maxPrice)
            discount = findedCoupon.maxPrice;

          totalValue = totalValue - discount;
        }

        resolve(totalValue);
      } catch (err) {
        reject(err);
      }
    });
  }

  validateCreateDelivery(delivery: { items: number[]; quantity: number[] }): {
    valid: boolean;
    message?: string;
  } {
    if (!delivery.items) return { valid: false, message: "Products not added" };

    if (!delivery.quantity)
      return { valid: false, message: "Quantity of products not added" };

    if (delivery.items.length != delivery.quantity.length)
      return { valid: false, message: "Invalid products or quantity" };

    return { valid: true };
  }

  validadeProductQuantity(
    products: I_DataProduct[],
    quantity: number[]
  ): {
    valid: boolean;
    message?: string;
  } {
    for (let i = 0; i < products.length; i++) {
      if (products[i].quantity) {
        if (products[i].quantity < quantity[i]) {
          return {
            valid: false,
            message: `Invalid quantity to ${products[i].name}`,
          };
        }
      }
    }

    return { valid: true };
  }
}
