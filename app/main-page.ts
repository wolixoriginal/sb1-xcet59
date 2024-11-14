import { EventData, Page } from '@nativescript/core';
import { GameViewModel } from './game/game-view-model';

let gameViewModel: GameViewModel;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  gameViewModel = new GameViewModel();
  page.bindingContext = gameViewModel;
}

export function onUnloaded() {
  if (gameViewModel) {
    gameViewModel.onDestroy();
  }
}