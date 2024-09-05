import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { OrdersGateway } from '../orders/orders.gateway';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private ordersGateway: OrdersGateway,
  ) {}

  async findAll(): Promise<Item[]> {
    const items: Item[] = await this.itemsRepository.find();
    const url = process.env.SERVER_URL;
    return items.map(item => ({
      ...item,
      filename: `${url}/${item.filename}`, // Prepend the server name
    }));
  }

  async createItem(createItemDto : CreateItemDto, imagePath : String): Promise<Item> {
    console.log(createItemDto);
    const newItem = this.itemsRepository.create({...createItemDto, filename : imagePath});

    const savedItem = await this.itemsRepository.save(newItem);
    this.ordersGateway.emitItemUpdate({...savedItem, filename : `http://localhost:3000/${imagePath}`}); // Notify about the new item
    return savedItem;
  }

  async updateItem(id: number, name: string, quantity: number, unit: string, price: number): Promise<Item> {
    await this.itemsRepository.update(id, { name, quantity, unit, price });
    const updatedItem = await this.itemsRepository.findOne({ where: { id } });
    this.ordersGateway.emitItemUpdate(updatedItem); // Notify about the updated item
    return updatedItem;
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
    this.ordersGateway.server.emit('itemDeleted', id); // Notify about the deleted item
  }
}
