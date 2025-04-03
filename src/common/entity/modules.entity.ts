import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Class from './class.entity';
import Course from './course.entity';
import Inscriptions from './inscriptions.entity';

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
    cascade: true,
  })
  classes: Class[];

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @OneToMany(() => Inscriptions, (inscription) => inscription.module, {
    nullable: true,
    cascade: true,
  })
  inscriptions: Inscriptions[];

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
