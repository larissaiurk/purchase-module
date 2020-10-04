import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany
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

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(type => Quotation, quotation => quotation.proposals)
  quotation: Quotation;

  @ManyToOne(type => Provider, provider => provider.proposals)
  provider: Provider;

  @OneToMany(type => ProposalProduct, proposalProduct => proposalProduct.proposal)
  proposalProduct: ProposalProduct[];


}

export default Proposal;
