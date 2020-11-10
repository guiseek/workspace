/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  OverlayRef,
  GlobalPositionStrategy,
  OverlaySizeConfig,
} from '@angular/cdk/overlay';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PreviewPosition } from './preview-config';
import { CdkPreviewContainer } from './preview-container';

/** Unique id for the created preview. */
let uniqueId = 0;

/**
 * Reference to a preview opened via the Preview service.
 */
export class PreviewRef<T, R = any> {
  /** The instance of the component in the preview. */
  componentInstance: T;

  /** Whether the user is allowed to close the preview. */
  disableClose: boolean | undefined;

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  constructor(
    public _overlayRef: OverlayRef,
    protected _containerInstance: CdkPreviewContainer,
    readonly id: string = `preview-${uniqueId++}`
  ) {
    // If the preview has a backdrop, handle clicks from the backdrop.
    if (_containerInstance._config.hasBackdrop) {
      _overlayRef.backdropClick().subscribe(() => {
        if (!this.disableClose) {
          this.close();
        }
      });
    }

    this.beforeClosed().subscribe(() => {
      this._overlayRef.detachBackdrop();
    });

    this.afterClosed().subscribe(() => {
      this._overlayRef.detach();
      this._overlayRef.dispose();
      this.componentInstance = null!;
    });

    // Close when escape keydown event occurs
    _overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => {
          return (
            event.keyCode === ESCAPE &&
            !this.disableClose &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe((event) => {
        event.preventDefault();
        this.close();
      });
  }

  /** Gets an observable that emits when the overlay's backdrop has been clicked. */
  backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Close the preview.
   * @param previewResult Optional result to return to the preview opener.
   */
  close(previewResult?: R): void {
    this._result = previewResult;
    this._containerInstance._startExiting();
  }

  /**
   * Updates the preview's position.
   * @param position New preview position.
   */
  updatePosition(position?: PreviewPosition): this {
    let strategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.left(position.left)
        : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top
        ? strategy.top(position.top)
        : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Updates the preview's width and height, defined, min and max.
   * @param size New size for the overlay.
   */
  updateSize(size: OverlaySizeConfig): this {
    if (size.width) {
      this._getPositionStrategy().width(size.width.toString());
    }
    if (size.height) {
      this._getPositionStrategy().height(size.height.toString());
    }
    this._overlayRef.updateSize(size);
    this._overlayRef.updatePosition();
    return this;
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig()
      .positionStrategy as GlobalPositionStrategy;
  }

  /** Gets an observable that emits when preview begins opening. */
  beforeOpened(): Observable<void> {
    return this._containerInstance._beforeEnter;
  }

  /** Gets an observable that emits when preview is finished opening. */
  afterOpened(): Observable<void> {
    return this._containerInstance._afterEnter;
  }

  /** Gets an observable that emits when preview begins closing. */
  beforeClosed(): Observable<R | undefined> {
    return this._containerInstance._beforeExit.pipe(map(() => this._result));
  }

  /** Gets an observable that emits when preview is finished closing. */
  afterClosed(): Observable<R | undefined> {
    return this._containerInstance._afterExit.pipe(map(() => this._result));
  }
}
