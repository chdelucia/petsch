import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChCartList } from './cart-list';

describe('ChCartList', () => {
  let component: ChCartList;
  let fixture: ComponentFixture<ChCartList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChCartList],
    }).compileComponents();

    fixture = TestBed.createComponent(ChCartList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
