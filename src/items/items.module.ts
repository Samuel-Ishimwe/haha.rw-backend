import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { OrdersGateway } from 'src/orders/orders.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), OrdersGateway],
  controllers: [ItemsController],
  providers: [ItemsService,OrdersGateway],
})
export class ItemsModule {}
