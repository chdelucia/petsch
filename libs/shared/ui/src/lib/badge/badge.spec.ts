import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChBadge } from './badge';

describe('ChBadge', () => {
  let component: ChBadge;
  let fixture: ComponentFixture<ChBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(ChBadge);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('status', 'healthy');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should apply the correct class based on status', () => {
    fixture.componentRef.setInput('status', 'unhealthy');
    fixture.detectChanges();
    const badgeElement = fixture.nativeElement.querySelector('.ch-badge');
    expect(badgeElement.classList).toContain('ch-badge--unhealthy');

    fixture.componentRef.setInput('status', 'healthy');
    fixture.detectChanges();
    expect(badgeElement.classList).toContain('ch-badge--healthy');

    fixture.componentRef.setInput('status', 'very healthy');
    fixture.detectChanges();
    expect(badgeElement.classList).toContain('ch-badge--very-healthy');
  });
});
