import { Component, OnInit } from '@angular/core';
import { ToggleComponent } from '../utility/toggle/toggle.component';
import { AppSettings, SettingsService } from '../../services/settings.service';
import { CheckboxComponent } from '../utility/checkbox/checkbox.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ToggleComponent, CheckboxComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  settings: AppSettings | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  get regions(): (keyof AppSettings['region'])[] {
    return Object.keys(
      this.settings!.region
    ) as (keyof AppSettings['region'])[];
  }

  onToggleSinglePlayer() {
    this.settingsService.updateSettings({
      singlePlayer: !this.settings?.singlePlayer,
      multiPlayer: !this.settings?.multiPlayer,
    });
  }

  onToggleRounds() {
    this.settingsService.updateSettings({
      rounds: this.settings?.rounds === 5 ? 10 : 5,
    });
  }

  onToggletimer() {
    this.settingsService.updateSettings({
      timer: !this.settings?.timer,
    });
  }

  onToggleCorrectAnswer() {
    this.settingsService.updateSettings({
      showCorrectAnswer: !this.settings?.showCorrectAnswer,
    });
  }

  onToggleRegion(region: string, $event: boolean) {
    this.settingsService.updateSettings({
      region: {
        ...this.settings!.region,
        [region]: $event,
      },
    });
  }
}
