import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCartDrawer } from './cart-drawer';

describe('ChCartDrawer', () => {
  let component: ChCartDrawer;
  let fixture: ComponentFixture<ChCartDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChCartDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCartDrawer);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subtotal', 0);
    fixture.componentRef.setInput('titleLabel', 'pet of the day');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit openChange(false) when closeDrawer is called', () => {
    const spy = vi.spyOn(component.openChange, 'emit');
    component.closeDrawer();
    expect(spy).toHaveBeenCalledWith(false);
  });
});
