import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("bill")
class Bill {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  internNumber: number;

  @Column()
  ourNumber: number;

  @CreateDateColumn({ type: 'timestamptz', select: false, name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false,  name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'due_date' })
  dueDate: Date;

  @Column()
  originalValue: number;

  @Column()
  openValue: number;

  @Column()
  situation: string;

  @Column()
  documentId: number;

}

export default Bill;
