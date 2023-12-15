import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shipments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  customerName: string;

  @Column("text")
  customerAddress: string;

  @Column()
  phoneNumber: string;

  @Column("double precision")
  shipmentValue: number;

  @Column()
  destination: string;
}
