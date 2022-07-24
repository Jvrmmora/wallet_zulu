import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

//http://localhost:3000/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
