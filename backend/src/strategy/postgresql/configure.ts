import { DataSource } from "typeorm";
import { Photo } from "./photo/photo";
import { Vehicle } from "./vehicle/vehicle";
import { Employee } from "./employee";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Vehicle, Photo, Employee],
  synchronize: true,
  logging: false,
});
