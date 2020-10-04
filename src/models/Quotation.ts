import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn, 
  OneToMany
} from "typeorm";
import Order from './Order';
import Proposal from "./Proposal";
import Responsible from "./Responsible";

@Entity("quotation")
class Quotation {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(type => Order, order => order.quoatations)
  order: Order;

  @OneToMany(type => Proposal, proposal => proposal.quotation)
  proposals: Proposal[];

}

export default Quotation;
