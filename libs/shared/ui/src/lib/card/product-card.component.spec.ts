import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './product-card.component';
import { provideRouter } from '@angular/router';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
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
