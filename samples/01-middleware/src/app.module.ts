import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@sotaaaaa/nest-common';

@Module({
  imports: [CoreModule.forRoot({ path: '../../.service.yaml' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
