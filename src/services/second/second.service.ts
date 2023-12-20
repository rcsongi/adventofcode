import { Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';
import { GameModel, Pack } from '../../models/second.models';

@Injectable()
export class SecondService {

  constructor(private readonly helperService: HelperService) {
  }
  first(): number {
    let sum = 0;
    const lines = this.helperService.readFileIntoArray('src/input-files/input_2.txt')
    lines.forEach((line, index) => {
      const game = this.getGameData(line, index)
      if(this.isGameValid(game)) sum += index + 1;
    })

    return sum;
  }

  second(): number {
    let sum = 0;
    const lines = this.helperService.readFileIntoArray('src/input-files/input_2.txt')
    lines.forEach((line, index) => {
        const game = this.getGameData(line, index);
    sum = sum + this.gameStrenght(game)
    })
    return sum
  }

  private isGameValid(game: GameModel): boolean {
    let valid = true;
    game.packs.forEach(pack => {
      if(pack.blue > 14 || pack.red > 12 || pack.green > 13) valid = false
    })

    return  valid;
  }

  private gameStrenght(game: GameModel): number {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;

    game.packs.forEach(pack => {
      if(pack.red > minRed) minRed = pack.red;
      if(pack.green > minGreen) minGreen = pack.green;
      if(pack.blue > minBlue) minBlue = pack.blue;
    })

    return minRed * minGreen * minBlue
  }

  private getGameData(game: string, index: number): GameModel {
    const data = game.split(':')[1];
    const packs = data.slice(1).split(';');

    return  {
      id: index + 1,
      packs: packs.map(pack => this.getPackCount(pack))
    }
  }

  private getPackCount(packString: string): Pack {
    const balls = packString.split(',').map(ball => ball.trim());
    let red = 0;
    let blue = 0;
    let green = 0;

    balls.forEach(ball => {
      const numberofBall = +ball.split(' ')[0]
      const ballType = ball.split(' ')[1]
      switch (ballType){
        case 'red':
          red = numberofBall
          break;
        case 'green':
          green = numberofBall;
          break;
        case 'blue':
          blue = numberofBall;
          break;
      }
    })

    return  {
      red, green, blue
    }
  }
}


