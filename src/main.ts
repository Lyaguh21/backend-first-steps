import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // выкидывает лишние поля
      forbidNonWhitelisted: true, // если пришли лишние поля — 400
      transform: true, // превращает строки в нужные типы (если возможно)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
