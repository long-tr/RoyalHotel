import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  adult: number;

  @Column()
  child: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  numberOfDate: number;

  @Column()
  numberOfRoom: number;


  @Column()
  totalPrice: number;
}