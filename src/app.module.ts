import { Module } from '@nestjs/common';
import { RpaModule } from './rpa/rpa.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, RpaModule],
})
export class AppModule {}
