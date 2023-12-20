export interface Pack {
  red: number;
  blue: number;
  green: number;
}

export interface GameModel {
  id: number;
  packs: Pack[];
}