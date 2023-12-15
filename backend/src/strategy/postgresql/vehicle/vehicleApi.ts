import { Express } from "express";
import { DataSource } from "typeorm";
import { Vehicle } from "./vehicle";

export default class vehicleApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/vehicle/:id", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Vehicle, {
            vehicleId: parseInt(req.params.id),
        })
      );
    });

    this.#express.post("/vehicle", async (req, res) => {
      const { body } = req;
      console.log(body);

      const vehicle = new Vehicle();

      vehicle.type = body.type;
      vehicle.brand = body.brand;
      vehicle.load = body.load;
      vehicle.capacity = body.capacity;
      vehicle.year = body.year;
      vehicle.numberOfRepairs = body.numberOfRepairs;

      try {
        await this.#dataSource.manager.save(vehicle);
        console.log(`Vehicle has been created with id: ${vehicle.vehicleId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Vehicle creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        id: vehicle.vehicleId,
      });
    });
  }
}
