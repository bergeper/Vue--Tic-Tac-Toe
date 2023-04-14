export class Player {
  constructor(
    public symbol: string,
    public name: string,
    public checkForWin: number[],
    public score: number
  ) {}
}
