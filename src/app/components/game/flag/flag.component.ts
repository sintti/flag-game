import { Component, input } from '@angular/core';

@Component({
  selector: 'app-flag',
  standalone: true,
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.css',
})
export class FlagComponent {
  flag = input.required<string | undefined>();
}
