import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChListHeader } from './product-list-header.component';

describe('ChListHeader', () => {
  let component: ChListHeader;
  let fixture: ComponentFixture<ChListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChListHeader, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChListHeader);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Test Title');
    fixture.componentRef.setInput('showFilters', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
