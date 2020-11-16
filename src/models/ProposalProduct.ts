import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn
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

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  // Proposal Id
  @ManyToOne(type => Proposal, proposal => proposal.proposalProduct)
  @JoinColumn({name: 'proposal_id'})
  proposal: Proposal;

  @ManyToOne(type => Product, product => product.proposalProduct)
  @JoinColumn({name: 'product_id'})
  product: Product;

}

export default ProposalProduct;
