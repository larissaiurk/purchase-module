import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn
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

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Responsible, responsible => responsible.orders)
  @JoinColumn({name: 'responsible_id'})
  responsible: Responsible;

  @OneToMany(type => Quotation, quotation => quotation.order)
  quoatations: Quotation[];

  @OneToMany(type => OrderHistory, orderHistory => orderHistory.order)
  orderHistories: OrderHistory[];

}

export default Order;
