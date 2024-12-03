import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);
  });

  it('should close modal', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should open modal when button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="start-game-button"]')
    );
    button.nativeElement.click();
    expect(component.showModal).toBe(true);
  });
});
