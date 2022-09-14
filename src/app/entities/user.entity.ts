import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: string;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[];

}
