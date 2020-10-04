import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import Provider from "./Provider";

import Responsible from './Responsible';

@Entity("product")
class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  closed: boolean;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;

  @ManyToOne(type => Provider, provider => provider.id)
  provider: Provider;
}

export default Product;
