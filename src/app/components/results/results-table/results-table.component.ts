import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.css',
})
export class ResultsTableComponent implements OnInit {
  players$!: Observable<Player[]>;

  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    this.players$ = this.playersService.getPlayers();
  }
}
