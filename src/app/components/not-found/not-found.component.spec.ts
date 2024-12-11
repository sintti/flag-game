import { NotFoundComponent } from './not-found.component';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { routes } from '../../app.routes';

describe('NotFoundComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(NotFoundComponent, {
      providers: [provideRouter([])],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
  it('should render not found message', async () => {
    const { fixture } = await render(NotFoundComponent, {
      providers: [provideRouter([])],
    });

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      '404'
    );
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'Page not found'
    );
  });

  it('should navigate to / on click', async () => {
    const { fixture } = await render(NotFoundComponent, {
      providers: [provideRouter(routes)],
    });

    const location = fixture.debugElement.injector.get(Location);
    const router = fixture.debugElement.injector.get(Router);

    // Start navigation
    router.initialNavigation();

    // Navigate to /game route
    await router.navigate(['/asdf']);

    // Now Angular router is at /game and browser URL is /game
    expect(router.url).toBe('/asdf');
    expect(location.path()).toBe('/asdf');

    // Click on header link
    const goBackHomeLink = screen.getByTestId('home-link');
    goBackHomeLink.click();

    // Asset that we are back to / route
    expect(location.path()).toBe('/');
    expect(router.url).toBe('/');
  });
});
