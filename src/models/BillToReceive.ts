import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Bill from './Bill'

@Entity("bill_to_receive")
class BillToReceive {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @Column({default: false})
  drawee: boolean;

  @ManyToOne(type => Bill, bill => bill.billsToReceive)
  @JoinColumn({name: 'bill_id'})
  bill: Bill;

}

export default BillToReceive;
