import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListHeaderComponent } from './product-list-header.component';

describe('ProductListHeaderComponent', () => {
  let component: ProductListHeaderComponent;
  let fixture: ComponentFixture<ProductListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ProductListHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListHeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Title');
    fixture.componentRef.setInput('gridView', true);
    fixture.componentRef.setInput('showFilters', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
