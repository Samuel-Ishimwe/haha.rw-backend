import { Controller, Get, Param } from '@nestjs/common';
import { OrderItemService } from './orderitem.service';
import { OrderItem } from './entities/order.item.entity';

@Controller('orderitems')
export class OrderitemController {
    constructor(private readonly orderitemService: OrderItemService) {}

    @Get('/:id')
    findA(@Param() id:number): Promise<OrderItem[]> {
      return this.orderitemService.find(id['id']);
    }
  

}
