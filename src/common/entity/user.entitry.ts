import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
