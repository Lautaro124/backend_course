import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entitry';
import Module from './modules.entity';
import Course from './course.entity';

@Entity()
export default class Inscriptions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inscriptions)
  user: User;

  @ManyToOne(() => Module, (module) => module.inscriptions)
  module: Module;

  @ManyToOne(() => Course, (course) => course.inscriptions)
  course: Course;

  @Column({
    type: Date,
    default: new Date(),
  })
  date: Date;

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
