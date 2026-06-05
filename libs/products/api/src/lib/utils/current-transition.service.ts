import { ChangeDetectionStrategy, Injectable, signal, computed, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

export function onViewTransitionCreated(info: ViewTransitionInfo) {
  const currentTransitionService = inject(CurrentTransitionService);
  currentTransitionService.currentTransition.set(info);
  info.transition.finished.finally(() => {
    currentTransitionService.currentTransition.set(null);
  });
}

@Injectable({
  providedIn: 'root',
})
export class CurrentTransitionService {
  readonly currentTransition = signal<ViewTransitionInfo | null>(null);

  private readonly toId = computed(() =>
    this.findParam(this.currentTransition()?.to ?? null, 'id'),
  );
  private readonly fromId = computed(() =>
    this.findParam(this.currentTransition()?.from ?? null, 'id'),
  );

  getViewTransitionName(id: string | number) {
    const idStr = id.toString();

    // Optimization: Use pre-calculated IDs from computed signals to avoid
    // recursive route snapshot traversal on every call (O(1) instead of O(D)).
    const isBannerImg = this.toId() === idStr || this.fromId() === idStr;

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
