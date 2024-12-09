import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface AppSettings {
  singlePlayer: boolean;
  multiPlayer: boolean;
  rounds: 5 | 10;
  timer: boolean;
  showCorrectAnswer: boolean;
  region: {
    africa: boolean;
    americas: boolean;
    asia: boolean;
    europe: boolean;
    oceania: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private defaultSettings: AppSettings = {
    singlePlayer: false,
    multiPlayer: true,
    rounds: 5,
    timer: true,
    showCorrectAnswer: false,
    region: {
      africa: true,
      americas: true,
      asia: true,
      europe: true,
      oceania: true,
    },
  };

  private settingsSubject: BehaviorSubject<AppSettings>;

  constructor() {
    const storedSettings = localStorage.getItem('app-settings');
    this.settingsSubject = new BehaviorSubject<AppSettings>(
      storedSettings ? JSON.parse(storedSettings) : this.defaultSettings
    );
  }

  public getSettings() {
    return this.settingsSubject.asObservable();
  }

  public getSetting<K extends keyof AppSettings>(
    key: K
  ): Observable<AppSettings[K]> {
    return this.settingsSubject
      .asObservable()
      .pipe(map((settings) => settings[key]));
  }

  public updateSettings(newSettings: Partial<AppSettings>): void {
    const updatedSettings = { ...this.settingsSubject.value, ...newSettings };
    this.settingsSubject.next(updatedSettings);
    localStorage.setItem('appSettings', JSON.stringify(updatedSettings));
  }
}
