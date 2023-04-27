import { I_Coupon, I_DataCoupon } from "../../interfaces/coupon.interface";
import Coupon from "../models/coupon.model";

export class CouponRepository {
  findCoupons(): Promise<I_DataCoupon[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const coupons: any = await Coupon.findAll();

        resolve(coupons);
      } catch (err) {
        reject(err);
      }
    });
  }

  findCouponById(id: number): Promise<I_DataCoupon> {
    return new Promise(async (resolve, reject) => {
      try {
        const coupon: any = await Coupon.findByPk(id);

        if (!coupon) throw { err: "Coupon does not exist", status: 404 };

        resolve(coupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  findCoupon(coupon: any): Promise<I_DataCoupon> {
    return new Promise(async (resolve, reject) => {
      try {
        const findedCoupon: any = await Coupon.findOne({
          where: { ...coupon },
        });

        if (!findedCoupon) throw { err: "Coupon does not exist", status: 404 };

        resolve(findedCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  createCoupon(coupon: I_Coupon): Promise<I_DataCoupon> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!coupon.price) throw "'price' not informed";

        if (!coupon.name) throw "'name' not informed";

        if (!coupon.percentage) throw "'percentage' not informed";

        const createdCoupon: any = await Coupon.create({ ...coupon });

        await createdCoupon.reload();

        resolve(createdCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateCoupon(id: number, coupon: I_Coupon): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.findCouponById(id);

        if (
          !coupon.price &&
          !coupon.percentage &&
          !coupon.name &&
          !coupon.maxPrice
        )
          throw "No information was given to update";

        const updatedCoupon: any = await Coupon.update(coupon, {
          where: { id },
        });

        resolve(updatedCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteCoupon(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedCoupon: any = await Coupon.destroy({
          where: {
            id,
          },
        });

        if (deletedCoupon == 0)
          throw { err: "Coupon does not exist", status: 404 };

        resolve(deletedCoupon);
      } catch (err) {
        reject(err);
      }
    });
  }
}
