import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChPagination } from './pagination.component';
import { By } from '@angular/platform-browser';
import { ChButton } from '../button/button';

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
    fixture.componentRef.setInput('testId', 'pagination');
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

  it('should emit previous page when prev button is clicked', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');
    const prevBtn = fixture.debugElement.query(By.css('[data-testid="pagination-prev"]'));
    const buttonComponent = prevBtn.componentInstance as ChButton;
    buttonComponent.clicked.emit();
    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should emit next page when next button is clicked', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');
    const nextBtn = fixture.debugElement.query(By.css('[data-testid="pagination-next"]'));
    const buttonComponent = nextBtn.componentInstance as ChButton;
    buttonComponent.clicked.emit();
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should emit first page when first button is clicked', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');
    const firstBtn = fixture.debugElement.query(By.css('[data-testid="pagination-first"]'));
    const buttonComponent = firstBtn.componentInstance as ChButton;
    buttonComponent.clicked.emit();
    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should emit last page when last button is clicked', () => {
    const emitSpy = vi.spyOn(component.pageChange, 'emit');
    const lastBtn = fixture.debugElement.query(By.css('[data-testid="pagination-last"]'));
    const buttonComponent = lastBtn.componentInstance as ChButton;
    buttonComponent.clicked.emit();
    expect(emitSpy).toHaveBeenCalledWith(10);
  });

  it('should disable prev and first buttons on first page', () => {
    fixture.componentRef.setInput('page', 1);
    fixture.detectChanges();

    const prevBtn = fixture.debugElement.query(By.css('[data-testid="pagination-prev"]'));
    const firstBtn = fixture.debugElement.query(By.css('[data-testid="pagination-first"]'));

    expect(prevBtn.componentInstance.disabled()).toBe(true);
    expect(firstBtn.componentInstance.disabled()).toBe(true);
  });

  it('should disable next and last buttons on last page', () => {
    fixture.componentRef.setInput('page', 10);
    fixture.detectChanges();

    const nextBtn = fixture.debugElement.query(By.css('[data-testid="pagination-next"]'));
    const lastBtn = fixture.debugElement.query(By.css('[data-testid="pagination-last"]'));

    expect(nextBtn.componentInstance.disabled()).toBe(true);
    expect(lastBtn.componentInstance.disabled()).toBe(true);
  });
});
