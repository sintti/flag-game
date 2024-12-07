import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlagComponent } from './flag/flag.component';
import { PointsComponent } from './points/points.component';
import { AnswerOptionsComponent } from './answer-options/answer-options.component';
import { PlayersService } from '../../services/players.service';
import { CountriesService } from '../../services/countries.service';
import { AppSettings, SettingsService } from '../../services/settings.service';
import { Country } from '../../models/country';
import { Player } from '../../models/player';
import { ModalComponent } from './answer-modal/answer-modal.component';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    FlagComponent,
    PointsComponent,
    AnswerOptionsComponent,
    ModalComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  fourCountries: Country[] = [];
  selectedCountry: Country = {} as Country;
  settings: AppSettings | undefined;
  players: Player[] | undefined;
  turn: 'P1' | 'P2' | undefined;
  round = 0;
  modalVisible = false;
  winner$: Player | undefined;
  obsTimer: Observable<number> = timer(1, 1000);
  currentTimer$: number | undefined;
  obsTimerSubscription: Subscription | undefined;
  settingsSubscription: Subscription | undefined;
  playersSubscription: Subscription | undefined;
  turnSubscription: Subscription | undefined;

  constructor(
    private playersService: PlayersService,
    private countriesService: CountriesService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Initializing game component');

    this.fetchSettingsPlayersAndTurn();

    this.fetchCountries();
  }

  ngOnDestroy() {
    console.log('Destroying game component: ', this.obsTimerSubscription);

    if (this.obsTimerSubscription) {
      this.obsTimerSubscription.unsubscribe();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    if (this.turnSubscription) {
      this.turnSubscription.unsubscribe();
    }
  }

  get currentPlayer(): Player | undefined {
    return this.turn === 'P1' ? this.players?.[0] : this.players?.[1];
  }

  fetchCountries() {
    if (this.countries.length !== 0) {
      this.dealNewCountries();
      return;
    }

    this.countriesService.fetchCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.dealNewCountries();
      },
      error: (err) => {
        console.error(err.message);
      },
      complete: () => {
        console.log('Countries fetched');
      },
    });
  }

  fetchSettingsPlayersAndTurn() {
    this.settingsSubscription = this.settingsService
      .getSettings()
      .subscribe((settings) => {
        this.settings = settings;
      });

    this.playersSubscription = this.playersService
      .getPlayers()
      .subscribe((players) => {
        this.players = players;
      });

    this.turnSubscription = this.playersService.getTurn().subscribe((turn) => {
      this.turn = turn;
      this.handleTimerOnTurnChange(turn);
    });
  }

  handleTimerOnTurnChange(turn: 'P1' | 'P2') {
    if (this.settings?.timer) {
      console.log('Handling timer on turn change');

      if (this.obsTimerSubscription) {
        this.obsTimerSubscription.unsubscribe();
      }

      this.currentTimer$ = this.players?.find(
        (player) => player.id === turn
      )?.time;

      this.obsTimerSubscription = this.obsTimer.subscribe((timer) => {
        const timeToSave = this.currentTimer$! + timer;
        this.playersService.updatePlayerTime(turn, timeToSave);
      });
    }
  }

  dealNewCountries() {
    const newCountries: Country[] = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      newCountries.push(this.countries[randomIndex]);
    }
    this.fourCountries = newCountries;
    this.selectedCountry = this.chooseRandomCountryFromFour(newCountries);
  }

  chooseRandomCountryFromFour(fourCountries: Country[]): Country {
    const randomIndex = Math.floor(Math.random() * fourCountries.length);
    return fourCountries[randomIndex];
  }

  gameEnd() {
    return this.round === this.settings!.rounds * 2;
  }

  checkAnswer(name: string) {
    console.log('Checking answer');

    if (this.settings?.multiPlayer) {
      if (name === this.selectedCountry.fin) {
        this.playersService.addPlayerPoints(this.turn!);
        alert('Oikea vastaus! Vastauksesi oli: ' + this.selectedCountry.fin);
        this.round++;
        if (this.gameEnd()) {
          this.playersService.getWinner().subscribe((winner) => {
            this.winner$ = winner;
          });
          alert('Peli päättyi! Voittaja on: ' + this.winner$?.name);
          this.router.navigate(['/results']);
          return;
        }
        this.playersService.changeTurn();
        this.dealNewCountries();
      } else {
        alert('Väärä vastaus! Oikea vastaus oli: ' + this.selectedCountry.fin);
        this.round++;
        if (this.gameEnd()) {
          this.playersService.getWinner().subscribe((winner) => {
            this.winner$ = winner;
          });
          alert('Peli päättyi! Voittaja on: ' + this.winner$?.name);
          this.router.navigate(['/results']);
          return;
        }
        this.playersService.changeTurn();
        this.dealNewCountries();
      }
    }
    if (this.settings?.singlePlayer) {
      if (name === this.selectedCountry.fin) {
        this.playersService.addPlayerPoints('P1');
        alert('Oikea vastaus! Vastauksesi oli: ' + this.selectedCountry.fin);
        this.round++;
        if (this.gameEnd()) {
          alert('Sait yhteensä ' + this.players![0].points + ' pistettä!');
          this.router.navigate(['/results']);
          return;
        }
        this.dealNewCountries();
      } else {
        alert('Väärä vastaus! Oikea vastaus oli: ' + this.selectedCountry.fin);
        this.round++;
        if (this.gameEnd()) {
          alert('Sait yhteensä ' + this.players![0].points + ' pistettä!');
          this.router.navigate(['/results']);
          return;
        }
        this.dealNewCountries();
      }
    }
  }
}
