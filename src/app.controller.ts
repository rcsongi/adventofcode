import { Controller, Get } from '@nestjs/common';

import { FirstService } from './services/first/first.service';
import { SecondService } from './services/second/second.service';

@Controller()
export class AppController {
  constructor(
    private readonly firstService: FirstService,
    private readonly secondService: SecondService,
  ) {}

  @Get('/first')
  getFirst(): string {
    return `<strong>${this.firstService.first()}</strong>  <p><strong>${this.firstService.second()}</strong></p> `;
  }

  @Get('/second')
  getSecond(): string {
    return `<strong>${this.secondService.first()}</strong>  <p><strong>${this.secondService.second()}</strong></p> `;
  }
}
