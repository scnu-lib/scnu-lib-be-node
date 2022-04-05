import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger'
import helmet from 'helmet';
import csurf from 'csurf';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(csurf());
  app.setGlobalPrefix('apis');
  const config = new DocumentBuilder()
    .setTitle('SCNU-LIB-BE')
    .setDescription('The scnu-lib-be nodejs implement API document.')
    .setVersion('0.1')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('apis/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
