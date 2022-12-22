import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Chat Api')
        .setDescription('The Chat API description')
        .setVersion('1.0')
        .addTag('blog')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(parseInt(process.env.PORT) || 6000);
}
bootstrap();
