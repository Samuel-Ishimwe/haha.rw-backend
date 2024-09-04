import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Public } from 'src/auth/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Public()
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',{
        storage : diskStorage({
          destination : './uploads',
          filename : (req, file, callback)=>{
            console.log(file.originalname)
            const uniqueSuffix = Date.now() + '-' + file.originalname;
            const fileExtName = extname(file.originalname);
            const fileName = `${uniqueSuffix}`;
            callback(null, fileName);
          }
        })
      }
    )
  )
  async create(@Body() createItemDto: CreateItemDto, @UploadedFile() image: MulterFile,) {
    return await this.itemsService.createItem(createItemDto, image?.path);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateItemDto: { name: string; quantity: number; unit: string; price: number },
  ): Promise<Item> {
    return this.itemsService.updateItem(id, updateItemDto.name, updateItemDto.quantity, updateItemDto.unit, updateItemDto.price);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
