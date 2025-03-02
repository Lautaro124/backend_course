import {
  Column,
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
  shortDescription: string;

  @Column({
    type: String,
  })
  description: string;

  @Column({
    type: String,
  })
  videoUrl: string;

  @OneToMany(() => Attachment, (attachment) => attachment.class)
  attachments: Attachment[];

  @ManyToOne(() => Module, (module) => module.classes)
  module: Module;
}
