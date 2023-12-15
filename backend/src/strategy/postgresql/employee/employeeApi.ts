import { Express } from "express";
import { DataSource } from "typeorm";
import { Employee } from "./employee";
import e from "cors";

export default class employeeApi {
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;

    this.#express.get("/employee/:id", async (req, res) => {
      return res.json(
        await this.#dataSource.manager.findBy(Employee, {
            employeeId: parseInt(req.params.id),
        })
      );
    });

    this.#express.post("/employee", async (req, res) => {
      const { body } = req;
      console.log(body);

      const employee = new Employee();

      employee.name = body.name;
      employee.surname = body.surname;
      employee.seniority = body.seniority;
      employee.mechanicalCertificationStatus = body.mechanicalCertificationStatus;

      try {
        await this.#dataSource.manager.save(employee);
        console.log(`Employee has been created with id: ${employee.employeeId}`);
      } catch (err) {
        res.status(503);
        return res.json({
          error: "Employee creation failed in db.",
        });
      }

      res.status(200);
      return res.json({
        id: employee.employeeId,
      });
    });
  }
}
