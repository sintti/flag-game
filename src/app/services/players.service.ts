import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { AppSettings, SettingsService } from './settings.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  settings: AppSettings | undefined;
  private defaultPlayers: Player[] = [
    { id: 'P1', name: 'Player 1', points: 0 },
    { id: 'P2', name: 'Player 2', points: 0 },
  ];
  private defaultTurn: 'P1' | 'P2' = 'P1';

  private playersSubject: BehaviorSubject<Player[]>;
  private turnSubject: BehaviorSubject<'P1' | 'P2'>;

  constructor(private settingsService: SettingsService) {
    const storedPlayers = localStorage.getItem('players');
    const storedTurn = localStorage.getItem('turn');
    this.playersSubject = new BehaviorSubject<Player[]>(
      storedPlayers ? JSON.parse(storedPlayers) : this.defaultPlayers
    );
    this.turnSubject = new BehaviorSubject<'P1' | 'P2'>(
      storedTurn ? JSON.parse(storedTurn) : this.defaultTurn
    );
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  private savePlayers(players: Player[]): void {
    localStorage.setItem('players', JSON.stringify(players));
  }

  getTurn(): Observable<'P1' | 'P2'> {
    return this.turnSubject.asObservable();
  }

  getPlayers(): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }

  getPlayerById(id: string): Observable<Player | undefined> {
    return this.playersSubject
      .asObservable()
      .pipe(map((players) => players.find((player) => player.id === id)));
  }

  getWinner(): Observable<Player | undefined> {
    return this.playersSubject
      .asObservable()
      .pipe(
        map((players) =>
          players.reduce((prev, current) =>
            prev.points > current.points ? prev : current
          )
        )
      );
  }

  addPlayerPoints(id: string): void {
    const players = this.playersSubject.value.map((player) => {
      if (player.id === id) {
        return { ...player, points: player.points + 1 };
      }
      return player;
    });
    this.playersSubject.next(players);
    this.savePlayers(players);
  }

  changePlayerName(id: string, name: string): void {
    const players = this.playersSubject.value.map((player) => {
      if (player.id === id) {
        return { ...player, name };
      }
      return player;
    });
    this.playersSubject.next(players);
    this.savePlayers(players);
  }

  changeTurn(): void {
    this.turnSubject.next(this.turnSubject.value === 'P1' ? 'P2' : 'P1');
    localStorage.setItem('turn', JSON.stringify(this.turnSubject.value));
  }

  resetGame(): void {
    this.playersSubject.next(this.defaultPlayers);
    this.turnSubject.next(this.defaultTurn);
    localStorage.removeItem('players');
    localStorage.removeItem('turn');
  }
}
