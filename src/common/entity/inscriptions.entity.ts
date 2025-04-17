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
  enrolledDate: Date; // Renombrado de date a enrolledDate para consistencia

  @Column({
    type: 'int',
    default: 0,
  })
  progress: number;

  @Column({
    type: Boolean,
    default: false,
  })
  isFree: boolean;

  @Column({
    type: Boolean,
    default: false,
  })
  isCompleted: boolean;

  @Column({
    type: Boolean,
    default: false,
  })
  isInProgress: boolean;

  @Column({
    type: Boolean,
    default: true,
  })
  isNotStarted: boolean;

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
