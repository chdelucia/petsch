import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CurrentTransitionService {
  readonly currentTransition = signal<ViewTransitionInfo | null>(null);

  getViewTransitionName(id: string | number) {
    const transition = this.currentTransition();
    const idStr = id.toString();

    const isBannerImg =
      this.findParam(transition?.to ?? null, 'id') === idStr ||
      this.findParam(transition?.from ?? null, 'id') === idStr;

    return isBannerImg ? 'banner-img' : '';
  }

  private findParam(
    snapshot: ActivatedRouteSnapshot | null,
    paramName: string,
  ): string | null {
    if (!snapshot) {
      return null;
    }

    if (snapshot.params[paramName]) {
      return snapshot.params[paramName];
    }

    for (const child of snapshot.children) {
      const result = this.findParam(child, paramName);
      if (result) {
        return result;
      }
    }

    return null;
  }
}
