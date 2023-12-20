import { Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { NumberModel, SymbolModel } from '../../models/third.models';

@Injectable()
export class ThirdService {
  constructor(private readonly helperService: HelperService) {}

  first(): number {
    let sum = 0;
    const lines = this.helperService.readFileIntoArray(
      'src/input-files/input_3.txt',
    );
    const symbols = this.getSymbols(lines);
    const numbers = this.getNumbers(lines);
    numbers.forEach((number) => {
      const relevantSymbols = symbols.filter(
        (symbol) =>
          symbol.posY === number.posY ||
          symbol.posY === number.posY + 1 ||
          symbol.posY === number.posY - 1,
      );
      if (
        relevantSymbols.some(
          (symbol) =>
            number.posX - 1 <= symbol.posX &&
            number.posX + number.number.toString().length >= symbol.posX,
        )
      ) {
        sum += number.number;
      }
    });
    return sum;
  }

  second(): number {
    let sum = 0;
    const lines = this.helperService.readFileIntoArray(
      'src/input-files/input_3.txt',
    );
    const symbols = this.getSymbols(lines).filter(
      (symbol) => symbol.symbol === '*',
    );
    const numbers = this.getNumbers(lines);
    console.log(symbols);
    symbols.forEach((symbol) => {
      const relevantNumbers = numbers.filter(
        (number) =>
          symbol.posY === number.posY ||
          symbol.posY + 1 === number.posY ||
          symbol.posY - 1 === number.posY,
      );
      const adjecents = relevantNumbers.filter(
        (number) =>
          symbol.posX <= number.posX + number.number.toString().length &&
          symbol.posX + 1 >= number.posX,
      );
      if (adjecents.length === 2) {
        console.log('Relevant: ', adjecents);
        sum = sum + adjecents[0].number * adjecents[1].number;
      }
    });

    return sum;
  }

  private getNumbers(lines: string[]): NumberModel[] {
    const numbers = [];
    lines.forEach((line, index) => {
      const chars = [...line];
      chars.forEach((char, i) => {
        if (!isNaN(+char) && isNaN(+chars[i - 1]))
          numbers.push({
            posX: i,
            posY: index,
            number: this.getNumber(chars, i),
          });
      });
    });

    return numbers;
  }

  private getNumber(chars: string[], startIndex: number): number {
    const cut = chars.slice(startIndex);
    let numberString = '';
    cut.every((c) => {
      if (isNaN(+c)) return false;
      else {
        numberString = numberString.concat(c);
        return true;
      }
    });
    return +numberString;
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
