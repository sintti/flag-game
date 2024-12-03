import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../utility/button/button.component';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-answer-options',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './answer-options.component.html',
  styleUrl: './answer-options.component.css',
})
export class AnswerOptionsComponent {
  fourCountries = input<Country[]>([]);
  answer = output<string>();

  onSubmitAnswer($event: Event) {
    this.answer.emit(($event.target as HTMLButtonElement).textContent!.trim());
  }
}
