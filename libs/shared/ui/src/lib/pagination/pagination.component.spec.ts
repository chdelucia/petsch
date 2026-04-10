import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('page', 2);
    fixture.componentRef.setInput('totalPages', 10);
    fixture.componentRef.setInput('links', {
      first: 'url1',
      prev: 'url2',
      next: 'url3',
      last: 'url4',
    });
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

  it('should emit url change event', () => {
    const url = 'http://test.com';
    const emitSpy = vi.spyOn(component.urlChange, 'emit');

    component.emitUrl(url);

    expect(emitSpy).toHaveBeenCalledWith(url);
  });

  it('should not emit url change if url is undefined', () => {
    const emitSpy = vi.spyOn(component.urlChange, 'emit');

    component.emitUrl(undefined);

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
