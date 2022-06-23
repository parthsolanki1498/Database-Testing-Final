import { DataSource } from "typeorm";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: "postgres",
  password: "pg_password",
  database: "pg-persistence-service-development",
  entities: [],
  synchronize: true,
  logging: false,
});
