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
    const apps = component.apps();
    expect(apps.length).toBe(3);
    expect(apps[0].id).toBe('petshop');
    expect(apps[1].id).toBe('rickymorty');
    expect(apps[2].id).toBe('dragonball');
  });

  it('should render the default logo when no custom logo is provided', () => {
    const svg = fixture.nativeElement.querySelector('.ch-navbar__logo svg');
    expect(svg.innerHTML).toContain('M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5');
  });

  it('should render the custom logo when provided', () => {
    fixture.componentRef.setInput('logoCustom', 'path/to/logo.svg');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('.ch-navbar__logo img');
    expect(img.src).toContain('path/to/logo.svg');
  });
});
