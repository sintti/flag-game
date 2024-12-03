import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { Player } from '../../models/player';
import { ResultsTableComponent } from './results-table/results-table.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, ResultsTableComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit, AfterViewInit {
  players$!: Observable<Player[]>;
  winner$!: Observable<Player>;

  constructor(private playersService: PlayersService) {}

  ngOnInit() {
    this.players$ = this.playersService.getPlayers();
  }

  ngAfterViewInit() {
    this.winner$ = this.players$.pipe(
      map((players) =>
        players.reduce((winner, player) =>
          player.points > winner.points ? player : winner
        )
      )
    );
  }
}
