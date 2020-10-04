import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToOne, OneToMany
} from "typeorm";

import Order from "./Order";

@Entity("responsible")
class Responsible {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Order, order => order.responsible)
  orders: Order[];

}

export default Responsible;
