import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class AppController {
  //constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return 'hello world';
  }
}
