import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Item } from 'src/items/entities/item.entity';
import { OrdersGateway } from './orders.gateway';
import { ItemsModule } from 'src/items/items.module';
import { OrderItem } from 'src/orderitem/entities/order.item.entity';
import { OrderItemModule } from 'src/orderitem/order.item.module';

@Module({
  imports : [TypeOrmModule.forFeature([Order, Item, OrderItem]), OrdersGateway],
  controllers: [OrdersController],
  providers: [OrdersGateway, OrdersService],
  exports: [OrdersGateway, OrdersService]
})
export class OrdersModule {}
