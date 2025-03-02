import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entitry';
import Module from './modules.entity';

@Entity()
export default class Inscriptions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inscriptions)
  user: User;

  @ManyToOne(() => Module, (module) => module.inscriptions)
  module: Module;

  @Column({
    type: Date,
    default: new Date(),
  })
  date: Date;
}
