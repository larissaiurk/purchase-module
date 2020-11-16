import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne, JoinColumn
} from "typeorm";

import Product from "./Product";
import Provider from "./Provider";



@Entity("product_provider")
class ProductProvider {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "float"})
  price: number;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(type => Provider, provider => provider.productProviders)
  @JoinColumn({name: 'provider_id'})
  provider: Provider;

  @ManyToOne(type => Product, product => product.productProviders)
  @JoinColumn({name: 'product_id'})
  product: Product;

}

export default ProductProvider;
