import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCard } from './product-card.component';
import { provideRouter } from '@angular/router';

describe('ChCard', () => {
  let component: ChCard;
  let fixture: ComponentFixture<ChCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChCard, getTranslocoTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('name', 'Product Name');
    fixture.componentRef.setInput('imageUrl', 'https://placehold.co/600x400');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
