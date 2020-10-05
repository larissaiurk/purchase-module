import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne
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
  provider: Provider;

  @ManyToOne(type => Product, product => product.productProviders)
  product: Product;

}

export default ProductProvider;
