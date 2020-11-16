import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";

import Provider from "./Provider";
import ProductProvider from "./ProductProvider";
import ProposalProduct from "./ProposalProduct";
import { name } from "../ormconfig";

@Entity("product")
class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({name: 'unit_measure'})
  unitMeasure: string;
  
  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @OneToMany(type => ProductProvider, productProvider => productProvider.provider)
  productProviders: ProductProvider[];

  @OneToMany(type => ProposalProduct, proposalProduct => proposalProduct.proposal)
  proposalProduct: ProposalProduct[];

}

export default Product;
