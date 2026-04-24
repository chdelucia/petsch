import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChNavbar } from './navbar';
import { getTranslocoTestingModule } from '@petsch/shared-utils';

describe('ChNavbar', () => {
  let component: ChNavbar;
  let fixture: ComponentFixture<ChNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChNavbar, getTranslocoTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChNavbar);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentApp', 'petshop');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    expect(component.isMenuOpen()).toBe(false);
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should have app URLs', () => {
    const apps = component.apps;
    expect(apps.length).toBe(3);
    expect(apps[0].id).toBe('petshop');
    expect(apps[1].id).toBe('rickymorty');
    expect(apps[2].id).toBe('dragonball');
  });
});
