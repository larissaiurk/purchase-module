import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Bill from "./Bill";
import Provider from "./Provider";

@Entity("bill_to_pay")
class BillToPay {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(type => Bill, bill => bill.billsToPay)
  @JoinColumn({name: 'bill_id'})
  bill: Bill;

  @ManyToOne(type => Provider, provider => provider.billsToPay)
  @JoinColumn({name: 'beneficiary_id'})
  beneficiary: Provider;

}

export default BillToPay;
