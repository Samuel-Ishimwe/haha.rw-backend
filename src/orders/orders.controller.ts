import { Controller, Post, Get, Body, Req, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from 'src/orderitem/entities/order.item.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req :Request) : Promise<Order> {
  const user = req["user"];
   const userId = user.user.id;
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @Get('')
  findAllOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Get('/:clientId')
  findAllOrdersByClient(@Param() id:number): Promise<Order[]> {
    return this.ordersService.findAllOrdersByClient(id);
  }
}
