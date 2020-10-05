import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany
} from "typeorm";

import Product from "./Product";
import ProductProvider from './ProductProvider';
import Proposal from "./Proposal";

@Entity("provider")
class Provider {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @OneToMany(type => Proposal, proposal => proposal.provider)
  proposals: Proposal[];

  @OneToMany(type => ProductProvider, productProvider => productProvider.provider)
  productProviders: ProductProvider[];

}

export default Provider;
