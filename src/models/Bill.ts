import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import BillToPay from './BillToPay'
import BillToReceive from './BillToReceive'

@Entity("bill")
class Bill {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({name: 'intern_number'})
  internNumber: number;

  @Column({name: 'our_number'})
  ourNumber: number;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'due_date' })
  dueDate: Date;

  @Column({name: 'original_value'})
  originalValue: number;

  @Column({name: 'open_value'})
  openValue: number;

  @Column()
  situation: string;

  @Column({name: 'document_id'})
  documentId: number;

  @OneToMany(type => BillToReceive, bill => bill.bill)
  billsToReceive: BillToReceive[];

  @OneToMany(type => BillToPay, bill => bill.bill)
  billsToPay: BillToPay[];

}

export default Bill;
