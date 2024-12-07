import { Component } from '@angular/core';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { ButtonComponent } from '../utility/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlayerModalComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
