// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  type: string;

  @Column()
  recurring_type:string;
  
  @Column()
  date: string;
  
  @Column()
  end_date: string;
  
  @Column()
  amount: number;

  @ManyToOne(type => User, user => user.transactions)
  user: User;

}
