import { Column, Entity, In, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  shortDescription: string;

  @Column({
    type: String,
  })
  previewImage: string;

  @OneToMany(() => Module, (module) => module.course, {
    nullable: true,
  })
  modules: Module[];

  @Column({
    type: Boolean,
    default: false,
  })
  isPurchased: boolean;
}
