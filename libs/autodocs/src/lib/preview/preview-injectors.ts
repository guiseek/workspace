/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { InjectionToken } from '@angular/core';
import { ComponentType, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { PreviewRef } from './preview-ref';
import { CdkPreviewContainer } from './preview-container';
import { PreviewConfig } from './preview-config';

/** Injection token for the Preview's ScrollStrategy. */
export const PREVIEW_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'PreviewScrollStrategy'
);

/** Injection token for the Preview's Data. */
export const PREVIEW_DATA = new InjectionToken<any>('PreviewData');

/** Injection token for the PreviewRef constructor. */
export const PREVIEW_REF = new InjectionToken<PreviewRef<any>>('PreviewRef');

/** Injection token for the PreviewConfig. */
export const PREVIEW_CONFIG = new InjectionToken<PreviewConfig>('PreviewConfig');

/** Injection token for the Preview's PreviewContainer component. */
export const PREVIEW_CONTAINER = new InjectionToken<
  ComponentType<CdkPreviewContainer>
>('PreviewContainer');

/** @docs-private */
export function SEEK_PREVIEW_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const SEEK_PREVIEW_SCROLL_STRATEGY_PROVIDER = {
  provide: PREVIEW_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: SEEK_PREVIEW_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
