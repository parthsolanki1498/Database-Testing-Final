import { Express } from "express";
import { DataSource } from "typeorm";
import { EmployeeVehicle } from "./employeeVehicle"
import e from "cors";

export default class employeeVehicleApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/employeeVehicle/:id", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(EmployeeVehicle, {
            employeeId: parseInt(req.params.id),
        })
      );
    });

    this.#express.post("/employeeVehicle", async (req, res) => {
      const { body } = req;
      console.log(body);

      const employeeVehicle = new EmployeeVehicle();

      employeeVehicle.employeeId = body.employeeId;
      employeeVehicle.vehicleId = body.vehicleId;

      try {
        await this.#dataSource.manager.save(employeeVehicle);
        console.log(`Employee Vehicle has been created with id: ${employeeVehicle.employeeId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Employee Vehicle creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        id: employeeVehicle.employeeId,
      });
    });

    this.#express.delete("/employeeVehicle/:id", async (req, res) => {
        const employeeId = parseInt(req.params.id);
  
        try {
          const employeeVehicleToRemove = await this.#dataSource.manager.findOne(EmployeeVehicle, {
            where: { employeeId: parseInt(req.params.id) },
          });
  
          if (!employeeVehicleToRemove) {
            res.status(404);
            return res.json({
              error: "Employee Vehicle not found.",
            });
          }
  
          await this.#dataSource.manager.remove(employeeVehicleToRemove);
  
          console.log(`Employee Vehicle with id ${employeeId} has been deleted.`);
          res.status(200);
          return res.json({
            message: "Employee Vehicle deleted successfully.",
          });
        } catch (err) {
          console.error("Error deleting Employee Vehicle:", err);
          res.status(503);
          return res.json({
            error: "Employee Vehicle deletion failed in db.",
          });
        }
      });
  }
}
