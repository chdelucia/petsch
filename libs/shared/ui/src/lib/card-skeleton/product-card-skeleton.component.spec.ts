import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSkeleton } from './product-card-skeleton.component';

describe('CardSkeleton', () => {
  let component: CardSkeleton;
  let fixture: ComponentFixture<CardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
