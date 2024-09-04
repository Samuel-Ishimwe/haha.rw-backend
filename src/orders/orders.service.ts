import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Item } from 'src/items/entities/item.entity';
import { OrdersGateway } from './orders.gateway';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from 'src/orderitem/entities/order.item.entity';


@Injectable()
export class OrdersService {
 
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private ordersGateway: OrdersGateway,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>
  ) {}

  async createOrder(userId : number , createOrderDto : CreateOrderDto): Promise<Order> {
    const items  = createOrderDto["items"]
    const order = this.ordersRepository.create({
      clientId : userId,
      totalAmount : createOrderDto["totalAmount"]
    });

    const savedOrder = await this.ordersRepository.save(order);

    
    for (const item of items){
      const orderId : number = savedOrder.id;
      const itemToSave = this.orderItemRepository.create({
         item : {id : item["id"]},
         order : {id:savedOrder.id},
         quantity : item["quantity"]
      })
      const saveditemOrder = await this.orderItemRepository.save(itemToSave);
    }

    //this.ordersGateway.emitItemUpdate(item); // Notify about the updated item

    return savedOrder;
  }

  async findAllOrders(): Promise<Order[]> {
    return  await this.ordersRepository.find({});
  }
  async findAllOrdersByClient(id: any): Promise<Order[]> {
    const orders = this.ordersRepository.findBy(
      id
    )
    return orders;
  }
}
