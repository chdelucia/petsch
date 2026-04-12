import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feature404 } from './feature-404';
import { provideRouter } from '@angular/router';

describe('Feature404', () => {
  let component: Feature404;
  let fixture: ComponentFixture<Feature404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature404],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Feature404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
