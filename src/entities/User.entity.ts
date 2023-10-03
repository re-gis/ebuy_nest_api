/* eslint-disable */
import { InitiatorAudit } from 'src/audit/InitiatorAudit';
import { Column, Entity, PrimaryGeneratedColumn, Table, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends InitiatorAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  constructor(
    email: string,
    username: string,
    password: string,
    isAdmin?: boolean,
  ) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
