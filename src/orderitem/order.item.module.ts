import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderItem } from './entities/order.item.entity';
import { OrderItemService } from './orderitem.service';
import { OrderitemController } from './orderitem.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    exports:[OrderItemModule],
    providers: [OrderItemService],
    controllers: [OrderitemController]
})
export class OrderItemModule {
    
}
