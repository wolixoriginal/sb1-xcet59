import { Observable } from '@nativescript/core';

export class Player extends Observable {
  private _health: number = 100;
  private _hunger: number = 100;
  private _energy: number = 100;
  private _inventory: Map<string, number> = new Map();

  constructor() {
    super();
    this._inventory.set('wood', 0);
    this._inventory.set('stone', 0);
    this._inventory.set('food', 0);
  }

  get health(): number { return this._health; }
  get hunger(): number { return this._hunger; }
  get energy(): number { return this._energy; }
  get inventory(): Map<string, number> { return this._inventory; }

  updateStats() {
    this._hunger = Math.max(0, this._hunger - 0.5);
    this._energy = Math.max(0, this._energy - 0.3);
    
    if (this._hunger < 20 || this._energy < 20) {
      this._health = Math.max(0, this._health - 1);
    }

    this.notifyPropertyChange('health', this._health);
    this.notifyPropertyChange('hunger', this._hunger);
    this.notifyPropertyChange('energy', this._energy);
  }

  collectResource(type: string) {
    const current = this._inventory.get(type) || 0;
    this._inventory.set(type, current + 1);
    this._energy = Math.max(0, this._energy - 5);
    this.notifyPropertyChange('inventory', this._inventory);
  }

  eat() {
    const food = this._inventory.get('food') || 0;
    if (food > 0) {
      this._inventory.set('food', food - 1);
      this._hunger = Math.min(100, this._hunger + 30);
      this.notifyPropertyChange('inventory', this._inventory);
      this.notifyPropertyChange('hunger', this._hunger);
    }
  }

  rest() {
    this._energy = Math.min(100, this._energy + 20);
    this.notifyPropertyChange('energy', this._energy);
  }
}