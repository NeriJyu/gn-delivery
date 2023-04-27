import {
  I_DataDelivery,
  I_Delivery,
} from "../../interfaces/delivery.interface";
import Delivery from "../models/delivery.model";

export class DeliveryRepository {
  findDeliveries(): Promise<I_DataDelivery[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const deliveries: any = await Delivery.findAll();

        resolve(deliveries);
      } catch (err) {
        reject(err);
      }
    });
  }

  findDeliveryById(id: number): Promise<I_DataDelivery> {
    return new Promise(async (resolve, reject) => {
      try {
        const delivery: any = await Delivery.findByPk(id);

        if (!delivery) throw { err: "Delivery does not exist", status: 404 };

        resolve(delivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  createDelivery(delivery: I_Delivery): Promise<I_DataDelivery> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!delivery.userId) throw "'userId' not informed";

        if (!delivery.status) throw "'status' not informed";

        if (!delivery.value) throw "'value' not informed";

        const createdDelivery: any = await Delivery.create({ ...delivery });

        await createdDelivery.reload();

        resolve(createdDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateDelivery(id: number, delivery: I_Delivery): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.findDeliveryById(id);

        if (!delivery.status && !delivery.value)
          throw "No information was given to update";

        const updatedDelivery: any = await Delivery.update(delivery, {
          where: { id },
        });

        resolve(updatedDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteDelivery(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedDelivery: any = await Delivery.destroy({
          where: {
            id,
          },
        });

        if (deletedDelivery == 0)
          throw { err: "Delivery does not exist", status: 404 };

        resolve(deletedDelivery);
      } catch (err) {
        reject(err);
      }
    });
  }
}
