import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany
} from "typeorm";
import OrderHistory from "./OrderHistory";
import Quotation from "./Quotation";

import Responsible from './Responsible';

@Entity("order")
class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column({default: false})
  closed: boolean;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(type => Responsible, responsible => responsible.orders)
  responsible: Responsible;

  @OneToMany(type => Quotation, quotation => quotation.order)
  quoatations: Quotation[];

  @OneToMany(type => OrderHistory, orderHistory => orderHistory.order)
  orderHistories: OrderHistory[];

}

export default Order;
