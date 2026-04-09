import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListViewComponent } from './product-list-view.component';
import { provideRouter } from '@angular/router';

describe('ProductListViewComponent', () => {
  let component: ProductListViewComponent;
  let fixture: ComponentFixture<ProductListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListViewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
