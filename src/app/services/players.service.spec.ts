import { TestBed } from '@angular/core/testing';
import { PlayersService } from './players.service';
import { AppSettings, SettingsService } from './settings.service';
import { of } from 'rxjs';

describe('PlayersService', () => {
  let service: PlayersService;
  let settingsServiceStub: Partial<SettingsService>;

  beforeEach(() => {
    settingsServiceStub = {
      getSettings: () =>
        of({
          singlePlayer: false,
          multiPlayer: true,
          rounds: 5,
        } as AppSettings),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: SettingsService, useValue: settingsServiceStub }],
    });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default players', (done) => {
    service.getPlayers().subscribe((players) => {
      expect(players.length).toBe(2);
      expect(players[0].name).toBe('Player 1');
      done();
    });
  });

  it('should return default turn', (done) => {
    service.getTurn().subscribe((turn) => {
      expect(turn).toBe('P1');
      done();
    });
  });

  it('should add points to a player', () => {
    service.addPlayerPoints('P1');
    service.getPlayerById('P1').subscribe((player) => {
      expect(player?.points).toBe(1);
    });
  });

  it('should change player name', () => {
    service.changePlayerName('P1', 'New Player 1');
    service.getPlayerById('P1').subscribe((player) => {
      expect(player?.name).toBe('New Player 1');
    });
  });

  it('should change turn', (done) => {
    service.changeTurn();
    service.getTurn().subscribe((turn) => {
      expect(turn).toBe('P2');
      done();
    });
  });

  it('should reset game', (done) => {
    service.resetGame();
    service.getPlayers().subscribe((players) => {
      expect(players.length).toBe(2);
      expect(players[0].points).toBe(0);
    });
    service.getTurn().subscribe((turn) => {
      expect(turn).toBe('P1');
      done();
    });
  });

  it('should get the winner', (done) => {
    service.addPlayerPoints('P1');
    service.getWinner().subscribe((winner) => {
      expect(winner?.id).toBe('P1');
      done();
    });
  });
});
