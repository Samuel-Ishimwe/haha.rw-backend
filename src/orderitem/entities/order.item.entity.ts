import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Item)
  item: Item;

  @ManyToOne(()=>Order)
  order: Order;

  @Column()
  quantity : number
}
