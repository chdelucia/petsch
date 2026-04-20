import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureItemOfDay } from './feature-pet-of-day';
import { ITEM_OF_DAY_STORE } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { signal } from '@angular/core';

describe('FeatureItemOfDay', () => {
  let component: FeatureItemOfDay;
  let fixture: ComponentFixture<FeatureItemOfDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureItemOfDay, getTranslocoTestingModule()],
      providers: [
        {
          provide: ITEM_OF_DAY_STORE,
          useValue: {
            entries: signal([]),
            sortedEntries: signal([]),
            isOpen: signal(false),
            toggleIotd: vi.fn(),
            removeItem: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureItemOfDay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
