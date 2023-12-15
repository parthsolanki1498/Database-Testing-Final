import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicleId: number;

  @Column()
  type: string;

  @Column()
  brand: string;

  @Column()
  load: number;

  @Column()
  capacity: number;

  @Column()
  year: number;

  @Column()
  numberOfRepairs: number;
}