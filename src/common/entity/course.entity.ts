import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Module from './modules.entity';

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
  previewImage: string;

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];
}
