import { Component, input } from '@angular/core';

@Component({
  selector: 'app-answer-modal',
  standalone: true,
  templateUrl: './answer-modal.component.html',
})
export class ModalComponent {
  result = input<string>('');
  correctAnswer = input<string>('');
}
