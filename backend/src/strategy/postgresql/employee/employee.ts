import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: string;

  @Column()
  mechanicalCertificationStatus: string;
}