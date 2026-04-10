import { Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CurrentTransitionService {
  readonly currentTransition = signal<ViewTransitionInfo | null>(null);

  getViewTransitionName(id: string | number) {
    const transition = this.currentTransition();
    const isBannerImg =
      transition?.to.firstChild?.firstChild?.params['id'] === id.toString() ||
      transition?.from.firstChild?.firstChild?.params['id'] === id.toString();
    return isBannerImg ? 'banner-img' : '';
  }
}
