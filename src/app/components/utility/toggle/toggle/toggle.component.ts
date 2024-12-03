import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent {
  isChecked = input<boolean | undefined>(false);
}
