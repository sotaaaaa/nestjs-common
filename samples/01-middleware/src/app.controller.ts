import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
export { default as DefaultExport } from '../../../.eslintrc.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
