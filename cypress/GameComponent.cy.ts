import { provideHttpClient } from '@angular/common/http';
import { GameComponent } from '../src/app/components/game/game.component';
import { routes } from '../src/app/app.routes';
import { provideRouter } from '@angular/router';
import { PlayersService } from '../src/app/services/players.service';
import { CountriesService } from '../src/app/services/countries.service';
import { SettingsService } from '../src/app/services/settings.service';

describe('GameComponent.cy.ts', () => {
  it('playground', () => {
    const mockPlayersService = {
      getPlayers: cy.stub().resolves([
        { id: 'P1', name: 'Player 1', points: 45 },
        { id: 'P2', name: 'Player 2', points: 0 },
      ]),
    };

    const mockCountriesService = {
      getCountries: cy.stub().resolves([
        { id: '1', name: 'Finland', flag: 'assets/fi.svg', fin: 'Suomi' },
        { id: '2', name: 'Sweden', flag: 'flag', fin: 'Ruotsi' },
        { id: '3', name: 'Norway', flag: 'flag', fin: 'Norja' },
        { id: '4', name: 'Denmark', flag: 'flag', fin: 'Tanska' },
      ]),
    };

    const mockSettingsService = {
      getSettings: cy.stub().resolves({
        singlePlayer: false,
        multiPlayer: true,
      }),
    };
    cy.mount(GameComponent, {
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        { provide: PlayersService, useValue: mockPlayersService },
        { provide: CountriesService, useValue: mockCountriesService },
        { provide: SettingsService, useValue: mockSettingsService },
      ],
      componentProperties: {
        countries: [
          { id: '1', name: 'Finland', flag: 'assets/fi.svg', fin: 'Suomi' },
          { id: '2', name: 'Sweden', flag: 'flag', fin: 'Ruotsi' },
          { id: '3', name: 'Norway', flag: 'flag', fin: 'Norja' },
          { id: '4', name: 'Denmark', flag: 'flag', fin: 'Tanska' },
        ],
        fourCountries: [
          { id: '1', name: 'Finland', flag: 'assets/fi.svg', fin: 'Suomi' },
          { id: '2', name: 'Sweden', flag: 'flag', fin: 'Ruotsi' },
          { id: '3', name: 'Norway', flag: 'flag', fin: 'Norja' },
          { id: '4', name: 'Denmark', flag: 'flag', fin: 'Tanska' },
        ],
        selectedCountry: {
          id: '1',
          name: 'Finland',
          flag: 'assets/fi.svg',
          fin: 'Suomi',
        },
        settings: {
          singlePlayer: false,
          multiPlayer: true,
        },
        players$: [
          { id: 'P1', name: 'Player 1', points: 45 },
          { id: 'P2', name: 'Player 2', points: 0 },
        ],
        turn$: 'P1',
      },
    });
    cy.get('[data-testid="flag-assets/fi.svg"]').should(
      'have.attr',
      'src',
      'assets/fi.svg',
    );
    cy.get('[data-testid="answer-button-suomi"]').should(
      'contain.text',
      'Suomi',
    );
  });
});
