import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeeVehicle {
  @PrimaryGeneratedColumn()
  employeeId: number;

  @Column()
  vehicleId: string;
}