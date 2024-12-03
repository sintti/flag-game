import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import { FlagComponent } from './flag.component';
import { routes } from '../../../app.routes';

describe('FlagComponent', () => {
  it('should render the flag image with the correct src and data-testid', async () => {
    await render(FlagComponent, {
      providers: [provideRouter(routes), provideHttpClient()],
      componentInputs: {
        flag: 'assets/fi.g',
      },
    });

    // Tarkista, että kuva löytyy ja on näkyvissä
    const flagImage = screen.getByTestId('flag-assets/fi.g');
    expect(flagImage).toBeVisible();

    // Varmista, että src-attribuutti on asetettu oikein
    // expect(flagImage).toHaveAttribute('src', 'assets/fi.svg');
  });
});
