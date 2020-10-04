import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne
} from "typeorm";
import Proposal from "./Proposal";


@Entity("proposal_product")
class ProposalProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  paymentDate: Date;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  // Product Id

  // Proposal Id
  @ManyToOne(type => Proposal, proposal => proposal.id)
  proposal: Proposal;

}

export default ProposalProduct;
