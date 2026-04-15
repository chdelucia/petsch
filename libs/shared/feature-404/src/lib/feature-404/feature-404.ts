import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'petsch-feature-404',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslocoDirective],
  templateUrl: './feature-404.html',
  styleUrl: './feature-404.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'feature-404-host',
  },
})
export class Feature404 {}
