import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Class from './class.entity';
import Inscriptions from './inscriptions.entity';
import Course from './course.entity';

@Entity()
export default class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    unique: true,
  })
  name: string;

  @Column({
    type: String,
  })
  description: string;

  @Column({
    type: Number,
  })
  price: number;

  @OneToMany(() => Class, (classEntity) => classEntity.module, {
    nullable: true,
  })
  classes: Class[];

  @OneToMany(() => Inscriptions, (inscription) => inscription.module, {
    nullable: true,
  })
  inscriptions: Inscriptions[];

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;
}
