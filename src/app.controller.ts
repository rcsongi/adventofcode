import { Controller, Get } from '@nestjs/common';

import { FirstService } from './services/first/first.service';
import { SecondService } from './services/second/second.service';
import { ResponseModel } from './models/responses.models';

@Controller()
export class AppController {
  constructor(
    private readonly firstService: FirstService,
    private readonly secondService: SecondService,
  ) {}
  @Get('/first')
  getFirst(): ResponseModel {
    return {
      first: this.firstService.first(),
      second: this.firstService.second(),
    };
  }

  @Get('/second')
  getSecond(): ResponseModel {
    return {
      first: this.secondService.first(),
      second: this.secondService.second(),
    };
  }
}
