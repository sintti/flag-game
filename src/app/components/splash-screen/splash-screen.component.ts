import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.css',
})
export class SplashScreenComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    // Aseta viivästys, jonka jälkeen splash screen piilotetaan
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // Splash screen näkyy 3 sekuntia ennen kuin se piilotetaan
  }
}
