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

  it('should render the petshop logo when currentApp is petshop', () => {
    fixture.componentRef.setInput('currentApp', 'petshop');
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('.ch-navbar__logo svg');
    // The petshop logo path starts with M12 2C15.3137
    expect(svg.innerHTML).toContain('M12 2C15.3137');
  });

  it('should render the rickymorty logo when currentApp is rickymorty', () => {
    fixture.componentRef.setInput('currentApp', 'rickymorty');
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('.ch-navbar__logo svg');
    // The rickymorty logo path starts with M19,20.41
    expect(svg.innerHTML).toContain('M19,20.41');
  });

  it('should render the dragonball logo when currentApp is dragonball', () => {
    fixture.componentRef.setInput('currentApp', 'dragonball');
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('.ch-navbar__logo svg');
    // The dragonball logo path starts with M12 17.27
    expect(svg.innerHTML).toContain('M12 17.27');
  });
});
