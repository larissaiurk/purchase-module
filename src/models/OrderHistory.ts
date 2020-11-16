import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable, 
  ManyToOne
} from "typeorm";
import Order from "./Order";

@Entity("order_history")
class OrderHistory {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  // relacao order id
  @ManyToOne(type => Order, order => order.orderHistories)
  order: Order;
}

export default OrderHistory;
