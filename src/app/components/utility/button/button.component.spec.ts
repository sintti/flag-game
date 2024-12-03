import { render, screen, RenderResult } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let renderResult: RenderResult<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    renderResult = await render(ButtonComponent, {});
    component = renderResult.fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have default text', () => {
    const defaultText = screen.getByText('Click Me');

    expect(defaultText).toBeVisible();
  });
});
