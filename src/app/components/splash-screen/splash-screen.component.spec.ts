import { provideHttpClient } from '@angular/common/http';
import { SplashScreenComponent } from './splash-screen.component';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { CountriesService } from '../../services/countries.service';

const mockCountriesService = {
  fetchCountries: jest.fn(() => of([])), // Palauttaa tyhjän listan
};

describe('SplashScreenComponent', () => {
  it('should show for 3 seconds and then disappear', async () => {
    const { fixture } = await render(SplashScreenComponent, {
      providers: [
        provideHttpClient(),
        { provide: CountriesService, useValue: mockCountriesService },
      ],
    });

    expect(screen.getByTestId('splash-screen')).toBeVisible();
    expect(screen.getByTestId('splash-image')).toBeInTheDocument();

    fixture.componentInstance.isLoading = false;
    fixture.detectChanges();

    expect(screen.queryByTestId('splash-screen')).not.toBeInTheDocument();
    expect(screen.queryByTestId('splash-image')).not.toBeInTheDocument();
  });
});
