import { Component, input } from '@angular/core';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [],
  templateUrl: './points.component.html',
  styleUrl: './points.component.css',
})
export class PointsComponent {
  playerName = input<string>('');
  playerPoints = input<number>(0);
  playerTime = input<number>(0);
}
