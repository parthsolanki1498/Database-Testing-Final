import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import PhotoApi from "./strategy/postgresql/photo";
import vehicleApi from "./strategy/postgresql/vehicle/vehicleApi";
import employeeApi from "./strategy/postgresql/employee/employeeApi";
import employeeVehicleApi from "./strategy/postgresql/employeeVehicle/employeeVehicleApi";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = await postgresDataSource.initialize();

  new PhotoApi(datasource, app);
  app.get("/photoApi", (_, res) => {
    return res.send("Photo API");
  });

  new vehicleApi(datasource, app);
  app.get("/vehicleApi", (_, res) => {
    return res.send("Vehicle API");
  });

  new employeeApi(datasource, app);
  app.get("/employeeApi", (_, res) => {
    return res.send("Employee API");
  });

  new employeeVehicleApi(datasource, app);
  app.get("/employeeVehicleApi", (_, res) => {
    return res.send("Employee Vehicle API");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
