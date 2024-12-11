import { fireEvent, render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';
import { Location } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';

describe('Header component', () => {
  it('should render header', async () => {
    await render(HeaderComponent, {});

    expect(screen.getByText('Lippukingi')).toBeVisible();
  });

  it('should render search input and navigate to / on click', async () => {
    const { fixture } = await render(HeaderComponent, {
      providers: [provideRouter(routes)],
    });

    const location = fixture.debugElement.injector.get(Location);
    const router = fixture.debugElement.injector.get(Router);

    // Start navigation
    router.initialNavigation();

    // Navigate to /game route
    await router.navigate(['/game']);

    fixture.detectChanges();
    await fixture.whenStable();

    // Now Angular router is at /game and browser URL is /game
    expect(router.url).toBe('/game');
    expect(location.path()).toBe('/game');

    // Click on header link
    const headerLink = screen.getByText('Lippukingi');
    fireEvent.click(headerLink);

    // Wait for navigation to complete
    fixture.detectChanges();
    await fixture.whenStable();

    // Asset that we are back to / route
    expect(location.path()).toBe('/');
    expect(router.url).toBe('/');
  });

  it('should open menu on click', async () => {
    const { fixture } = await render(HeaderComponent, {});

    const menuButton = screen.getByTestId('navbar-hamburger-menu');
    expect(fixture.componentInstance.isMenuVisible).toBe(false);
    fireEvent.click(menuButton);

    // expect toggleMenu() to be called
    expect(fixture.componentInstance.isMenuVisible).toBe(true);
    expect(screen.getByTestId('settings-component')).toBeVisible();
  });
});
