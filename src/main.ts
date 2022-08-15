import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function bootstrap() {
  const pkg = JSON.parse(fs.readFileSync('package.json').toString());

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addSecurity('api-key', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = parseInt(process.env.PORT || '8080', 10);

  await app.init();
  await app.listen(port);
}

bootstrap().catch((err) => console.error(err));
