import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  const swagger_config = new DocumentBuilder()
    .setTitle('iSEE Server')
    .setDescription('iSEE API description')
    .setVersion('1.0')
    .addTag('iSEE')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
