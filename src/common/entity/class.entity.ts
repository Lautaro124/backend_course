import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Attachment from './attachment.entity';
import Module from './modules.entity';

@Entity()
export default class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  title: string;

  @Column({
    type: String,
  })
  description: string;

  @Column({
    type: String,
  })
  videoUrl: string;

  @OneToMany(() => Attachment, (attachment) => attachment.class, {
    nullable: true,
  })
  attachments: Attachment[];

  @ManyToOne(() => Module, (module) => module.classes)
  module: Module;

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
