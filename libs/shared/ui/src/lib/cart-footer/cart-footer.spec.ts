import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCartFooter } from './cart-footer';

describe('ChCartFooter', () => {
  let component: ChCartFooter;
  let fixture: ComponentFixture<ChCartFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoTestingModule(), ChCartFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCartFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
