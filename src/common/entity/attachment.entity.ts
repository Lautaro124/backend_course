import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Class from './class.entity';

@Entity()
export default class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  name: string;

  @Column({
    type: String,
  })
  url: string;

  @Column({
    type: String,
  })
  type: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.attachments)
  class: Class;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
