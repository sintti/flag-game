import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink, SettingsComponent],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Lippukingi';
  isMenuVisible = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
