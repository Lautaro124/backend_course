import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Inscriptions from './inscriptions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  fullName: string;

  @Column({
    type: String,
  })
  email: string;

  @Column({
    type: String,
  })
  password: string;

  @Column({
    type: String,
    default: 'student',
  })
  role: string;

  @Column({
    type: String,
  })
  ocupation: string;

  @Column({
    type: Date,
  })
  birthdate: Date;

  @OneToMany(() => Inscriptions, (inscription) => inscription.user, {
    nullable: true,
  })
  inscriptions: Inscriptions[];
}
