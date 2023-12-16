import { Express } from "express";
import { DataSource, Repository } from "typeorm";
import { Employee } from "./employee";
import e from "cors";

export default class employeeApi {
  #dataSource: DataSource;
  #express: Express;
  #employeeRepository: Repository<Employee>;


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

    this.#express.delete("/employee/:id", async (req, res) => {
      const employeeId = parseInt(req.params.id);

      try {
        const employeeToRemove = await this.#dataSource.manager.findOne(Employee, {
          where: { employeeId: parseInt(req.params.id) },
        });

        if (!employeeToRemove) {
          res.status(404);
          return res.json({
            error: "Employee not found.",
          });
        }

        await this.#dataSource.manager.remove(employeeToRemove);

        console.log(`Employee with id ${employeeId} has been deleted.`);
        res.status(200);
        return res.json({
          message: "Employee deleted successfully.",
        });
      } catch (err) {
        console.error("Error deleting Employee:", err);
        res.status(503);
        return res.json({
          error: "Employee deletion failed in db.",
        });
      }
    });
    
    this.#express.put("/employee/:id", async (req, res) => {
      const { body } = req;

      try {
        const employeeToUpdate = await this.#dataSource.manager.findOne(Employee, {
          where: { employeeId: parseInt(req.params.id) },
        });
        if (!employeeToUpdate) {
          res.status(404).json({
            error: "Employee not found.",
          });
          return;
        }

        employeeToUpdate.name = body.name;
        employeeToUpdate.surname = body.surname;
        employeeToUpdate.seniority = body.seniority;
        employeeToUpdate.mechanicalCertificationStatus = body.mechanicalCertificationStatus;

        await this.#dataSource.manager.save(employeeToUpdate);

        res.status(200).json({
          message: "Employee updated successfully.",
        });
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Employee update failed in db.",
        });
      }
    });
  }
}
