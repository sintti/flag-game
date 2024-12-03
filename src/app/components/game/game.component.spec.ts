import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideHttpClient } from '@angular/common/http';
import { render, screen, RenderResult } from '@testing-library/angular';
import { of } from 'rxjs';

import { GameComponent } from './game.component';
import { Country } from '../../models/country';
import { Player } from '../../models/player';
import { AppSettings } from '../../services/settings.service';
import { PlayersService } from '../../services/players.service';
import { CountriesService } from '../../services/countries.service';
import { SettingsService } from '../../services/settings.service';

// Mock data
const mockSettings: AppSettings = {
  singlePlayer: false,
  multiPlayer: true,
  rounds: 5,
};

const mockPlayers: Player[] = [
  { id: 'P1', name: 'Player 1', points: 45 },
  { id: 'P2', name: 'Player 2', points: 0 },
];

const mockCountryData: Country[] = [
  { id: '1', name: 'Finland', flag: 'assets/fi.svg', fin: 'Suomi' },
  { id: '2', name: 'Sweden', flag: 'assets/se.svg', fin: 'Ruotsi' },
  { id: '3', name: 'Norway', flag: 'assets/no.svg', fin: 'Norja' },
  { id: '4', name: 'Denmark', flag: 'assets/dk.svg', fin: 'Tanska' },
];

// Mock services
export const mockPlayersService = {
  getPlayers: jest.fn().mockReturnValue(of(mockPlayers)),
  getTurn: jest.fn().mockReturnValue(of('P1' as 'P1' | 'P2')),
};

export const mockCountriesService = {
  fetchCountries: jest.fn().mockReturnValue(of(mockCountryData)),
};

export const mockSettingsService = {
  getSettings: jest.fn().mockReturnValue(of(mockSettings)),
};

describe('GameComponent', () => {
  let renderResult: RenderResult<GameComponent>;
  let component: GameComponent;

  beforeEach(async () => {
    renderResult = await render(GameComponent, {
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        { provide: PlayersService, useValue: mockPlayersService },
        { provide: CountriesService, useValue: mockCountriesService },
        { provide: SettingsService, useValue: mockSettingsService },
      ],
    });
    component = renderResult.fixture.componentInstance;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  describe('GameComponent functions:', () => {
    it('should fetch players on initialization', () => {
      expect(mockPlayersService.getPlayers).toHaveBeenCalled();
    });

    it('should fetch turn on initialization', () => {
      expect(mockPlayersService.getTurn).toHaveBeenCalled();
      expect(component.turn$).toBe('P1');
    });

    it('should fetch countries on initialization', () => {
      expect(mockCountriesService.fetchCountries).toHaveBeenCalled();
      expect(component.countries).toEqual(mockCountryData);
    });

    it('should fetch settings on initialization', () => {
      expect(mockSettingsService.getSettings).toHaveBeenCalled();
      expect(component.settings).toEqual(mockSettings);
    });

    it('should deal new countries on initialization', () => {
      expect(component.fourCountries.length).toBe(4);
      component.fourCountries.forEach((country) => {
        expect(mockCountryData).toContainEqual(country);
      });
    });

    it('should deal new countries when countries are already fetched', () => {
      const dealNewCountriesSpy = jest.spyOn(component, 'dealNewCountries');

      // Simuloidaan tilanteen muuttaminen
      component.countries = mockCountryData;
      component.dealNewCountries();

      expect(dealNewCountriesSpy).toHaveBeenCalled();
      expect(component.fourCountries.length).toBe(4);
      component.fourCountries.forEach((country) => {
        expect(mockCountryData).toContainEqual(country);
      });
    });

    it('should choose random country from four', () => {
      const randomCountry =
        component.chooseRandomCountryFromFour(mockCountryData);
      expect(randomCountry).toBeDefined();
      expect(mockCountryData).toContainEqual(randomCountry);
    });
  });

  describe('GameComponent UI:', () => {
    it('should render UI components', async () => {
      // Asetetaan komponentin tilat
      component.fourCountries = mockCountryData;
      component.selectedCountry = mockCountryData[0];
      component.players$ = mockPlayers;

      // Käynnistetään muutosten havaitseminen
      await renderResult.fixture.detectChanges();

      // Etsitään elementit
      const player1 = screen.getByText('Player 1');
      const flag = screen.getByTestId('flag-assets/fi.svg');
      const points = screen.getByText('45');
      const buttonFinland = screen.getByText('Suomi');
      const buttonSweden = screen.getByText('Ruotsi');
      const buttonNorway = screen.getByText('Norja');
      const buttonDenmark = screen.getByText('Tanska');

      // Tehdään assertaatiot
      expect(player1).toBeInTheDocument();
      expect(flag).toBeInTheDocument();
      expect(flag).toHaveAttribute('src', 'assets/fi.svg');
      expect(buttonFinland).toBeInTheDocument();
      expect(buttonSweden).toBeInTheDocument();
      expect(buttonNorway).toBeInTheDocument();
      expect(buttonDenmark).toBeInTheDocument();
      expect(points).toBeInTheDocument();
    });
  });
});
