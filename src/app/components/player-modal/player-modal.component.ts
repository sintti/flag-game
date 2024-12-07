import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { Router } from '@angular/router';
import { AppSettings, SettingsService } from '../../services/settings.service';
import { Player } from '../../models/player';
import { ButtonComponent } from '../utility/button/button.component';

@Component({
  selector: 'app-player-modal',
  standalone: true,
  templateUrl: './player-modal.component.html',
  imports: [FormsModule, ButtonComponent],
  styleUrls: ['./player-modal.component.css'],
})
export class PlayerModalComponent implements OnInit {
  playerName = '';
  closeModal = output();
  router = inject(Router);
  settings$: AppSettings | undefined;
  players$: Player[] | undefined;

  constructor(
    private playersService: PlayersService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings$ = settings;
    });
    this.playersService.getPlayers().subscribe((players) => {
      this.players$ = players;
    });
  }

  close() {
    this.closeModal.emit();
  }

  submit() {
    if (this.settings$?.singlePlayer && this.playerName) {
      this.playersService.changePlayerName('P1', this.playerName);
      this.close();
      this.router.navigate(['/game']);
    }
    if (
      this.settings$?.multiPlayer &&
      this.playerName &&
      this.players$![0].name === 'Player 1'
    ) {
      this.playersService.changePlayerName('P1', this.playerName);
      this.playerName = '';
    }
    if (
      this.settings$?.multiPlayer &&
      this.playerName &&
      this.players$![1].name === 'Player 2'
    ) {
      this.playersService.changePlayerName('P2', this.playerName);
      this.close();
      this.router.navigate(['/game']);
    }
  }
}
