import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListHeader } from './product-list-header.component';

describe('ListHeader', () => {
  let component: ListHeader;
  let fixture: ComponentFixture<ListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ListHeader);
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
