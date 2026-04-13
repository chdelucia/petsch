import { Injectable, signal, computed } from '@angular/core';
import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CurrentTransitionService {
  readonly currentTransition = signal<ViewTransitionInfo | null>(null);

  /**
   * Optimization: Pre-calculate the IDs involved in the transition once per transition change.
   * This avoids redundant recursive searches through the ActivatedRouteSnapshot tree
   * for every product in the list during change detection.
   */
  readonly activeTransitionIds = computed(() => {
    const transition = this.currentTransition();
    const ids = new Set<string>();
    if (transition) {
      const toId = this.findParam(transition.to ?? null, 'id');
      if (toId) ids.add(toId);
      const fromId = this.findParam(transition.from ?? null, 'id');
      if (fromId) ids.add(fromId);
    }
    return ids;
  });

  getViewTransitionName(id: string | number) {
    return this.activeTransitionIds().has(id.toString()) ? 'banner-img' : '';
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
