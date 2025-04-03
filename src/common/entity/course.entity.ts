import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Module from './modules.entity';
import Inscriptions from './inscriptions.entity';

@Entity()
export default class Course {
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
  previewImage: string;

  @OneToMany(() => Module, (module) => module.course, {
    nullable: true,
    cascade: true,
  })
  modules: Module[];

  @OneToMany(() => Inscriptions, (inscription) => inscription.course, {
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
