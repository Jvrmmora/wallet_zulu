import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{
    cors:true
  });

  app.use(json({ limit:'60mb' }));

  app.enableVersioning({
    defaultVersion:'1',
    type: VersioningType.URI
  });
  
  const config = new DocumentBuilder()
    .addBearerAuth() //Baber Token for verify user session
    .setTitle('Wallet ZULU API')
    .addServer(`http://localhost:${process.env.PORT}`,
    'Local Environment  '
    )
    .setDescription('Prueba tecnica de ingreso de Javier Montaño')
    .setVersion('1.0')
    .addTag('users')
    .addTag('wallet')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe()) //Validation api
  await app.listen(process.env.PORT);
}
bootstrap();
