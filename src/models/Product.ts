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

@Entity("product")
class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  unitMeasure: string;
  
  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @OneToMany(type => ProductProvider, productProvider => productProvider.provider)
  productProviders: ProductProvider[];

  @OneToMany(type => ProposalProduct, productProposal => productProposal.proposal)
  productProposal: ProposalProduct[];

}

export default Product;
