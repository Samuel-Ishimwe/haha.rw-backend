import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';
import { Client } from './clients/entities/client.entity';
import { Order } from './orders/entities/order.entity';
import { OrdersGateway } from './orders/orders.gateway';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderItem } from './orderitem/entities/order.item.entity';
import { OrderItemModule } from './orderitem/order.item.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath : '.env', isGlobal : true}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Directory to serve static files from
      serveRoot: '/uploads', // URL prefix for serving static files
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'KigaliNziza',
      database: 'kwisoko_store',
      entities: [Item, Client, Order, User, OrderItem ],
      synchronize: true,

    }),
    ItemsModule, OrdersModule, ClientsModule, OrdersGateway, UsersModule, AuthModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
