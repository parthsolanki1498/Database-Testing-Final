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

    this.#express.delete("/vehicle/:id", async (req, res) => {
        const vehicleId = parseInt(req.params.id);
  
        try {
          const vehicleToRemove = await this.#dataSource.manager.findOne(Vehicle, {
            where: { vehicleId: parseInt(req.params.id) },
          });
  
          if (!vehicleToRemove) {
            res.status(404);
            return res.json({
              error: "Vehicle not found.",
            });
          }
  
          await this.#dataSource.manager.remove(vehicleToRemove);
  
          console.log(`Vehicle with id ${vehicleId} has been deleted.`);
          res.status(200);
          return res.json({
            message: "Vehicle deleted successfully.",
          });
        } catch (err) {
          console.error("Error deleting Vehicle:", err);
          res.status(503);
          return res.json({
            error: "Vehicle deletion failed in db.",
          });
        }
      });
  }
}
