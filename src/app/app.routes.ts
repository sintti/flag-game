import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', component: NotFoundComponent },
];
