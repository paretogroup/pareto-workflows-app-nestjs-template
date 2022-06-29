import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const port = parseInt(process.env.PORT || '8080', 10);
  await app.listen(port);
}

bootstrap().catch((err) => console.error(err));
