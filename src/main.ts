import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SIIAN API')
    .setDescription('The SIIAN API description')
    .addTag('SIIAN')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access-token'
    )
    .build();
  const  documentFactpry = ()=> SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactpry);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN,
    methods: process.env.FRONTEND_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
