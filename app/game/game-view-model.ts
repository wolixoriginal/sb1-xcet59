import { Observable } from '@nativescript/core';
import { Player } from './player';

export class GameViewModel extends Observable {
  private player: Player;
  private gameLoop: any;

  constructor() {
    super();
    this.player = new Player();
    this.startGameLoop();
  }

  get health(): number { return this.player.health; }
  get hunger(): number { return this.player.hunger; }
  get energy(): number { return this.player.energy; }
  get inventory(): Map<string, number> { return this.player.inventory; }

  startGameLoop() {
    this.gameLoop = setInterval(() => {
      this.player.updateStats();
    }, 1000);
  }

  onCollectWood() {
    this.player.collectResource('wood');
  }

  onCollectStone() {
    this.player.collectResource('stone');
  }

  onCollectFood() {
    this.player.collectResource('food');
  }

  onEat() {
    this.player.eat();
  }

  onRest() {
    this.player.rest();
  }

  onDestroy() {
    clearInterval(this.gameLoop);
  }
}