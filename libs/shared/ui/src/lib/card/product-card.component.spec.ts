import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCard } from './product-card.component';
import { provideRouter } from '@angular/router';
import { PRODUCT_UI_CONFIG } from '@petsch/api';
import { By } from '@angular/platform-browser';

describe('ChCard', () => {
  let component: ChCard;
  let fixture: ComponentFixture<ChCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChCard, getTranslocoTestingModule()],
      providers: [
        provideRouter([]),
        {
          provide: PRODUCT_UI_CONFIG,
          useValue: { listRoute: '/test-route' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);
    fixture.componentRef.setInput('name', 'Product Name');
    fixture.componentRef.setInput('imageUrl', 'https://placehold.co/600x400');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct product name', () => {
    const titleElement = fixture.debugElement.query(By.css('.ch-product-card__title')).nativeElement;
    expect(titleElement.textContent).toContain('Product Name');
  });

  it('should display the correct image URL', () => {
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(imgElement.src).toContain('https://placehold.co/600x400');
  });

  it('should have the correct detail route', () => {
    expect(component.detailRoute).toEqual(['/test-route', '1']);
  });

  it('should use default detail route if config is missing', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ChCard, getTranslocoTestingModule()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);
    fixture.componentRef.setInput('name', 'Product Name');
    fixture.componentRef.setInput('imageUrl', 'https://placehold.co/600x400');
    fixture.detectChanges();

    expect(component.detailRoute).toEqual(['/pets', '1']);
  });
});
