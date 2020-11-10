/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewContainerRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { ComponentType } from '@angular/cdk/overlay';
import { CdkPreviewContainer } from './preview-container';

/** Valid ARIA roles for a preview element. */
export type PreviewRole = 'preview' | 'alertpreview';

/** Possible overrides for a preview's position. */
export interface PreviewPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class PreviewConfig<D = any> {
  /** Component to use as the container for the preview. */
  containerComponent?: ComponentType<CdkPreviewContainer>;

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the preview. This does not affect where the preview
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /** The id of the preview. */
  id?: string;

  /** The ARIA role of the preview. */
  role?: PreviewRole = 'preview';

  /** Custom class(es) for the overlay panel. */
  panelClass?: string | string[] = '';

  /** Whether the preview has a background. */
  hasBackdrop?: boolean = true;

  /** Custom class(es) for the backdrop. */
  backdropClass?: string | undefined = '';

  /** Whether the preview can be closed by user interaction. */
  disableClose?: boolean = false;

  /** The width of the preview. */
  width?: string = '';

  /** The height of the preview. */
  height?: string = '';

  /** The minimum width of the preview. */
  minWidth?: string | number = '';

  /** The minimum height of the preview. */
  minHeight?: string | number = '';

  /** The maximum width of the preview. */
  maxWidth?: string | number = '80vw';

  /** The maximum height of the preview. */
  maxHeight?: string | number = '';

  /** The position of the preview. */
  position?: PreviewPosition;

  /** Data to be injected into the preview content. */
  data?: D | null = null;

  /** The layout direction for the preview content. */
  direction?: Direction;

  /** ID of the element that describes the preview. */
  ariaDescribedBy?: string | null = null;

  /** Aria label to assign to the preview element */
  ariaLabel?: string | null = null;

  /** Whether the preview should focus the first focusable element on open. */
  autoFocus?: boolean = true;

  /** Duration of the enter animation. Has to be a valid CSS value (e.g. 100ms). */
  enterAnimationDuration?: string = '225ms';

  /** Duration of the exit animation. Has to be a valid CSS value (e.g. 50ms). */
  exitAnimationDuration?: string = '225ms';
}
