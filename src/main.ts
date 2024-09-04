import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadPath = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }
  app.useStaticAssets(uploadPath);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Server listening port : ' + port)
}
bootstrap();