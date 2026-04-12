import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturePetOfDay } from './feature-pet-of-day';
import { PETOFDAY_STORE } from '@petsch/api';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { signal } from '@angular/core';

describe('FeaturePetOfDay', () => {
  let component: FeaturePetOfDay;
  let fixture: ComponentFixture<FeaturePetOfDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePetOfDay, getTranslocoTestingModule()],
      providers: [
        {
          provide: PETOFDAY_STORE,
          useValue: {
            entries: signal([]),
            sortedEntries: signal([]),
            isOpen: signal(false),
            togglePoT: vi.fn(),
            removePet: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturePetOfDay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
