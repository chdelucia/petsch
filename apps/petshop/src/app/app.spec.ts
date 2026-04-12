import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { getTranslocoTestingModule } from '@petsch/shared-utils';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, getTranslocoTestingModule()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});
