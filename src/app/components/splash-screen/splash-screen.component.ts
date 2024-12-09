import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css',
})
export class SplashScreenComponent implements OnInit {
  isLoading = true;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.fetchCountries().subscribe({
      error: (err) => {
        console.error(err.message);
      },
      complete: () => {
        console.log('Countries fetched');
      },
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Splash screen näkyy 3 sekuntia ennen kuin se piilotetaan
  }
}
