import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCardSkeleton } from './product-card-skeleton.component';

describe('ChCardSkeleton', () => {
  let component: ChCardSkeleton;
  let fixture: ComponentFixture<ChCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
