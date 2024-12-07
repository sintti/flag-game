import { TestBed } from '@angular/core/testing';
import { SettingsService, AppSettings } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default settings if no settings are stored', () => {
    localStorage.removeItem('app-settings');
    service = TestBed.inject(SettingsService);
    service.getSettings().subscribe((settings) => {
      expect(settings).toEqual({
        singlePlayer: false,
        multiPlayer: true,
        rounds: 5,
      });
    });
  });

  it('should return stored settings if they exist', () => {
    const storedSettings: AppSettings = {
      singlePlayer: true,
      multiPlayer: false,
      rounds: 10,
      timeAttack: true,
    };

    service = TestBed.inject(SettingsService);
    service.getSettings().subscribe((settings) => {
      expect(settings).toEqual(storedSettings);
    });
  });

  it('should update settings and store them in localStorage', () => {
    const newSettings: Partial<AppSettings> = {
      singlePlayer: false,
      rounds: 10,
    };
    service.updateSettings(newSettings);
    service.getSettings().subscribe((settings) => {
      expect(settings.singlePlayer).toBe(false);
      expect(settings.rounds).toBe(10);
      expect(settings.multiPlayer).toBe(true); // unchanged
    });
    const storedSettings = JSON.parse(localStorage.getItem('appSettings')!);
    expect(storedSettings).toEqual({
      singlePlayer: false,
      multiPlayer: true,
      rounds: 10,
      timeAttack: false,
    });
  });
});
