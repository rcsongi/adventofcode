import { Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { SymbolModel } from '../../models/third.models';

@Injectable()
export class ThirdService {
  constructor(private readonly helperService: HelperService) {}

  first(): number {
    const sum = 0;
    const lines = this.helperService.readFileIntoArray(
      'src/input-files/input_3.txt',
    );
    const symbols = this.getSymbols(lines);
    const numbers = this.getNumbers(lines);
    const summedNumbers: any[] = [];
    return sum;
  }

  private getNumbers(lines: string[]): any[] {
    const numbers = [];
    lines.forEach((line, index) => {
      const chars = [...line];
      chars.forEach((char, i) => {
        if (!isNaN(+char))
          numbers.push({
            posX: i,
            posY: index,
            number: char,
          });
      });
    });

    return numbers;
  }
  private getSymbols(lines: string[]): SymbolModel[] {
    const symbols: SymbolModel[] = [];
    lines.forEach((line, index) => {
      const chars = [...line];
      chars.forEach((char, i) => {
        if (isNaN(+char) && char !== '.')
          symbols.push({
            posX: i,
            posY: index,
            symbol: char,
          });
      });
    });

    return symbols;
  }
}
