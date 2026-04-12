import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChPagination } from './pagination.component';

describe('ChPagination', () => {
  let component: ChPagination;
  let fixture: ComponentFixture<ChPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChPagination, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChPagination);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('totalPages', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page change event', () => {
    const pageNumber = 3;
    const emitSpy = vi.spyOn(component.pageChange, 'emit');

    component.emitPage(pageNumber);

    expect(emitSpy).toHaveBeenCalledWith(pageNumber);
  });
});
