import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany,
  Column,
  JoinColumn,
} from "typeorm";
import ProposalProduct from "./ProposalProduct";
import Provider from "./Provider";
import Quotation from "./Quotation";

@Entity("proposal")
class Proposal {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz'})
  payment_date: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  delivery_date: Date;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @Column({ default: false })
  choosed: boolean;
  
  @ManyToOne(type => Quotation, quotation => quotation.proposals)
  @JoinColumn({name: 'quotation_id'})
  quotation: Quotation;

  @ManyToOne(type => Provider, provider => provider.proposals)
  @JoinColumn({name: 'provider_id'})
  provider: Provider;

  @OneToMany(type => ProposalProduct, proposalProduct => proposalProduct.proposal)
  proposalProduct: ProposalProduct[];


}

export default Proposal;
