import { Express } from "express";
import { DataSource } from "typeorm";
import { Shipments } from "./shipments";

export default class ShipmentsApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/shipments/:id", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Shipments, {
          id: parseInt(req.params.id),
        })
      );
    });

    this.#express.post("/shipments", async (req, res) => {
      const { body } = req;
      console.log(body);

      const shipments = new Shipments();

      shipments.customerName = body.customerName;
      shipments.customerAddress = body.customerAddress;
      shipments.phoneNumber = body.phoneNumber;
      shipments.shipmentValue = body.shipmentValue;
      shipments.destination = body.destination;

      try {
        await this.#dataSource.manager.save(shipments);
        console.log(`Shipment has been created with id: ${shipments.id}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Shipment creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        id: shipments.id,
      });
    });

    this.#express.delete("/shipments/:id", async (req, res) => {
      const shipmentId = parseInt(req.params.id);

      try {
        const shipmentToRemove = await this.#dataSource.manager.findOne(Shipments, {
          where: { id: parseInt(req.params.id) },
        });

        if (!shipmentToRemove) {
          res.status(404);
          return res.json({
            error: "Shipment not found.",
          });
        }

        await this.#dataSource.manager.remove(shipmentToRemove);

        console.log(`Shipment with id ${shipmentId} has been deleted.`);
        res.status(200);
        return res.json({
          message: "Shipment deleted successfully.",
        });
      } catch (err) {
        console.error("Error deleting Shipment:", err);
        res.status(503);
        return res.json({
          error: "Shipment deletion failed in db.",
        });
      }
    });
  }
}
