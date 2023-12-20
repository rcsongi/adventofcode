import { Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
@Injectable()
export class FirstService {
  constructor(private readonly helperService: HelperService) {}

  first(): number {
    const lines = this.helperService.readFileIntoArray(
      'src/input-files/input_1.txt',
    );
    let sum = 0;
    lines.forEach((line) => {
      const chars = [...line];
      const filteredChars = chars.filter((s) => !isNaN(+s));
      const first = +filteredChars[0] * 10;
      const last = +filteredChars[filteredChars.length - 1];
      sum += first + last;
    });
    return sum;
  }

  second(): number {
    let sum = 0;
    const lines = this.helperService.readFileIntoArray(
      'src/input-files/input_1.txt',
    );
    lines.forEach((line) => {
      const chars = [...line];
      const filteredChars = chars.filter((s) => !isNaN(+s));

      const firstNumber = +filteredChars[0] * 10;
      const firstNumberIndex = chars.indexOf(filteredChars[0].toString());
      let firstDigitIndex = 999999;
      let firstDigit = 0;
      let lastDigit = 0;
      let lastDigitIndex = -1;
      this.digits.forEach((digit, index) => {
        const digitIndexFirst = line.indexOf(digit);
        if (digitIndexFirst > -1 && digitIndexFirst < firstDigitIndex) {
          firstDigitIndex = digitIndexFirst;
          firstDigit = (index + 1) * 10;
        }
        const digitIndexLast = line.lastIndexOf(digit);
        if (digitIndexLast > lastDigitIndex) {
          lastDigitIndex = digitIndexLast;
          lastDigit = index + 1;
        }
      });
      const lastNumber = +filteredChars[filteredChars.length - 1];

      const lastNumberIndex = chars.lastIndexOf(
        filteredChars[filteredChars.length - 1],
      );
      const lineSum =
        (firstNumberIndex < firstDigitIndex ? firstNumber : firstDigit) +
        (lastNumberIndex > lastDigitIndex ? lastNumber : lastDigit);
      sum = sum + lineSum;
    });
    return sum;
  }

  private get digits() {
    return [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ];
  }
}
