import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne
} from "typeorm";
import Proposal from "./Proposal";

import Product from './Product';

@Entity("proposal_product")
class ProposalProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  // Proposal Id
  @ManyToOne(type => Proposal, proposal => proposal.proposalProduct)
  proposal: Proposal;

  @ManyToOne(type => Product, product => product.proposalProduct)
  product: Product;

}

export default ProposalProduct;
