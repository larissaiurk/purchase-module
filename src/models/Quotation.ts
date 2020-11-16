import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn, 
  OneToMany,
  JoinColumn
} from "typeorm";
import Order from './Order';
import Proposal from "./Proposal";
import Responsible from "./Responsible";

@Entity("quotation")
class Quotation {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Order, order => order.quoatations)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @OneToMany(type => Proposal, proposal => proposal.quotation)
  proposals: Proposal[];

}

export default Quotation;
