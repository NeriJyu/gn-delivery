import { I_DataCoupon, I_Coupon } from "../../interfaces/coupon.interface";
import { CouponRepository } from "../repositories/coupon.repository";

export class CouponController {
  private couponRepository = new CouponRepository();

  findCoupons(): Promise<I_DataCoupon[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const coupons = await this.couponRepository.findCoupons();

        resolve(coupons);
      } catch (err) {
        reject(err);
      }
    });
  }

  findCouponById(id: number): Promise<I_DataCoupon> {
    return new Promise(async (resolve, reject) => {
      try {
        const coupon = await this.couponRepository.findCouponById(id);

        resolve(coupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  createCoupon(coupon: I_Coupon): Promise<I_DataCoupon> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdCoupon = await this.couponRepository.createCoupon(coupon);

        resolve(createdCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateCoupon(id: number, coupon: I_Coupon): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedCoupon = await this.couponRepository.updateCoupon(
          id,
          coupon
        );

        resolve(updatedCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteCoupon(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedCoupon = await this.couponRepository.deleteCoupon(id);

        resolve(deletedCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }
}
