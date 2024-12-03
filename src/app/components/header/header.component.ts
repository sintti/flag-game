import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Lippukingi';
}
