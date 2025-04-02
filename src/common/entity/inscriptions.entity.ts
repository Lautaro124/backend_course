import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entitry';
import Module from './modules.entity';
import Course from './course.entity';

@Entity()
export default class Inscriptions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @ManyToOne(() => Module, (module) => module.id)
  moduleId: string;

  @ManyToOne(() => Course, (course) => course.id)
  courseId: string;

  @Column({
    type: Date,
    default: new Date(),
  })
  date: Date;
}
