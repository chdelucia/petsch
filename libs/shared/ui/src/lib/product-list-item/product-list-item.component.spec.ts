import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { provideRouter } from '@angular/router';

describe('ProductListItemComponent', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', '1');
    fixture.componentRef.setInput('name', 'Name');
    fixture.componentRef.setInput('title', 'Title');
    fixture.componentRef.setInput('description', 'Description');
    fixture.componentRef.setInput('price', 100);
    fixture.componentRef.setInput('imageUrl', 'image.jpg');
    fixture.componentRef.setInput('creationAt', new Date());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
