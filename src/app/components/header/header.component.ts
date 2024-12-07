import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Lippukingi';
}
