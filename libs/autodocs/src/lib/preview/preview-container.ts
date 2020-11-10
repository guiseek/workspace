/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ngDevMode = true;

import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  Inject,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PreviewConfig } from './preview-config';

export function throwPreviewContentAlreadyAttachedError() {
  throw Error(
    'Attempting to attach preview content after content is already attached'
  );
}

/**
 * Internal component that wraps user-provided preview content.
 * @docs-private
 */
@Component({
  selector: 'cdk-preview-container',
  templateUrl: './preview-container.html',
  styleUrls: ['preview-container.scss'],
  encapsulation: ViewEncapsulation.None,
  // Using OnPush for previews caused some G3 sync issues. Disabled until we can track them down.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('preview', [
      state('enter', style({ opacity: 1 })),
      state('exit, void', style({ opacity: 0 })),
      transition('* => enter', animate('{{enterAnimationDuration}}')),
      transition('* => exit, * => void', animate('{{exitAnimationDuration}}')),
    ]),
  ],
  host: {
    '[@preview]': `{
      value: _state,
      params: {
        enterAnimationDuration: _config.enterAnimationDuration,
        exitAnimationDuration: _config.exitAnimationDuration
      }
    }`,
    '(@preview.start)': '_onAnimationStart($event)',
    '(@preview.done)': '_animationDone.next($event)',
  },
})
export class CdkPreviewContainer extends BasePortalOutlet implements OnDestroy {
  private readonly _document: Document;

  /** State of the preview animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Element that was focused before the preview was opened. Save this to restore upon close. */
  private _elementFocusedBeforePreviewWasOpened: HTMLElement | null = null;

  /** The class that traps and manages focus within the preview. */
  private _focusTrap = this._focusTrapFactory.create(
    this._elementRef.nativeElement
  );

  // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
  // metadata is not inherited by child classes, instead the host binding data is defined in a way
  // that can be inherited.
  // tslint:disable:no-host-decorator-in-concrete no-private-getters
  @HostBinding('attr.aria-label') get _ariaLabel() {
    return this._config.ariaLabel || null;
  }

  @HostBinding('attr.aria-describedby')
  get _ariaDescribedBy() {
    return this._config.ariaDescribedBy;
  }

  @HostBinding('attr.role') get _role() {
    return this._config.role;
  }

  @HostBinding('attr.aria-modal') _ariaModal: boolean = true;

  @HostBinding('attr.tabindex') get _tabindex() {
    return -1;
  }
  // tslint:disable:no-host-decorator-in-concrete no-private-getters

  /** The portal host inside of this container into which the preview content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true }) _portalHost: CdkPortalOutlet;

  /** A subject emitting before the preview enters the view. */
  _beforeEnter: Subject<void> = new Subject();

  /** A subject emitting after the preview enters the view. */
  _afterEnter: Subject<void> = new Subject();

  /** A subject emitting before the preview exits the view. */
  _beforeExit: Subject<void> = new Subject();

  /** A subject emitting after the preview exits the view. */
  _afterExit: Subject<void> = new Subject();

  /** Stream of animation `done` events. */
  _animationDone = new Subject<AnimationEvent>();

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _focusTrapFactory: FocusTrapFactory,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) _document: any,
    /** The preview configuration. */
    public _config: PreviewConfig
  ) {
    super();

    this._document = _document;

    // We use a Subject with a distinctUntilChanged, rather than a callback attached to .done,
    // because some browsers fire the done event twice and we don't want to emit duplicate events.
    // See: https://github.com/angular/angular/issues/24084
    this._animationDone
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        })
      )
      .subscribe((event) => {
        // Emit lifecycle events based on animation `done` callback.
        if (event.toState === 'enter') {
          this._autoFocusFirstTabbableElement();
          this._afterEnter.next();
          this._afterEnter.complete();
        }

        if (
          event.fromState === 'enter' &&
          (event.toState === 'void' || event.toState === 'exit')
        ) {
          this._returnFocusAfterPreview();
          this._afterExit.next();
          this._afterExit.complete();
        }
      });
  }

  /** Initializes the preview container with the attached content. */
  _initializeWithAttachedContent() {
    // Save the previously focused element. This element will be re-focused
    // when the preview closes.
    this._savePreviouslyFocusedElement();
    // Move focus onto the preview immediately in order to prevent the user
    // from accidentally opening multiple previews at the same time.
    this._focusPreviewContainer();
  }

  /** Destroy focus trap to place focus back to the element focused before the preview opened. */
  ngOnDestroy() {
    this._focusTrap.destroy();
    this._animationDone.complete();
  }

  /**
   * Attach a ComponentPortal as content to this preview container.
   * @param portal Portal to be attached as the preview content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (
      this._portalHost.hasAttached() &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throwPreviewContentAlreadyAttachedError();
    }

    return this._portalHost.attachComponentPortal(portal);
  }

  /**
   * Attach a TemplatePortal as content to this preview container.
   * @param portal Portal to be attached as the preview content.
   */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (
      this._portalHost.hasAttached() &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throwPreviewContentAlreadyAttachedError();
    }

    return this._portalHost.attachTemplatePortal(portal);
  }

  /**
   * Attaches a DOM portal to the preview container.
   * @param portal Portal to be attached.
   * @deprecated To be turned into a method.
   * @breaking-change 10.0.0
   */
  attachDomPortal = (portal: DomPortal) => {
    if (
      this._portalHost.hasAttached() &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throwPreviewContentAlreadyAttachedError();
    }

    return this._portalHost.attachDomPortal(portal);
  };

  /** Emit lifecycle events based on animation `start` callback. */
  _onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this._beforeEnter.next();
      this._beforeEnter.complete();
    }
    if (
      event.fromState === 'enter' &&
      (event.toState === 'void' || event.toState === 'exit')
    ) {
      this._beforeExit.next();
      this._beforeExit.complete();
    }
  }

  /** Starts the preview exit animation. */
  _startExiting(): void {
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this._changeDetectorRef.markForCheck();
  }

  /** Saves a reference to the element that was focused before the preview was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforePreviewWasOpened = this._document
        .activeElement as HTMLElement;
    }
  }

  /** Focuses the preview container. */
  private _focusPreviewContainer() {
    // Note that there is no focus method when rendering on the server.
    if (this._elementRef.nativeElement.focus) {
      this._elementRef.nativeElement.focus();
    }
  }

  /**
   * Autofocus the first tabbable element inside of the preview, if there is not a tabbable element,
   * focus the preview instead.
   */
  private _autoFocusFirstTabbableElement() {
    const element = this._elementRef.nativeElement;

    // If were to attempt to focus immediately, then the content of the preview would not yet be
    // ready in instances where change detection has to run first. To deal with this, we simply
    // wait for the microtask queue to be empty.
    if (this._config.autoFocus) {
      this._focusTrap.focusInitialElementWhenReady().then((hasMovedFocus) => {
        // If we didn't find any focusable elements inside the preview, focus the
        // container so the user can't tab into other elements behind it.
        if (!hasMovedFocus) {
          element.focus();
        }
      });
    } else {
      const activeElement = this._document.activeElement;

      // Otherwise ensure that focus is on the preview container. It's possible that a different
      // component tried to move focus while the open animation was running. See:
      // https://github.com/angular/components/issues/16215. Note that we only want to do this
      // if the focus isn't inside the preview already, because it's possible that the consumer
      // turned off `autoFocus` in order to move focus themselves.
      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  /** Returns the focus to the element focused before the preview was open. */
  private _returnFocusAfterPreview() {
    const toFocus = this._elementFocusedBeforePreviewWasOpened;
    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this._document.activeElement;
      const element = this._elementRef.nativeElement;

      // Make sure that focus is still inside the preview or is on the body (usually because a
      // non-focusable element like the backdrop was clicked) before moving it. It's possible that
      // the consumer moved it themselves before the animation was done, in which case we shouldn't
      // do anything.
      if (
        !activeElement ||
        activeElement === this._document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        toFocus.focus();
      }
    }
  }
}
