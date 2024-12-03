import { signal } from '@angular/core';
import { FlagComponent } from '../src/app/components/game/flag/flag.component';

describe('FlagComponent.cy.ts', () => {
  it('playground', () => {
    cy.mount(FlagComponent, {
      componentProperties: {
        flag: signal('assets/fi.g'),
      },
    });
    cy.get('[data-testid="flag-assets/fi.g"]').should('be.visible');
  });
});
