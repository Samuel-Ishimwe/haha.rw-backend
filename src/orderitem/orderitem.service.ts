import { Injectable } from '@nestjs/common';
import { OrderItem } from './entities/order.item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
    ) {}
    async find(id:number) : Promise<OrderItem[]>{
        return this.orderItemRepository.find(
            {
                where:{order: {id}},
                relations: ['order', 'item']
            }
        );
    }
}
