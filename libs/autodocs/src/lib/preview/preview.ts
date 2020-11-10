/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ngDevMode = true;
import {
  TemplateRef,
  SkipSelf,
  Optional,
  Injectable,
  Injector,
  Inject,
  ComponentRef,
  OnDestroy,
  Type,
  StaticProvider,
} from '@angular/core';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { of as observableOf, Observable, Subject, defer } from 'rxjs';
import { PreviewRef } from './preview-ref';
import { Location } from '@angular/common';
import { PreviewConfig } from './preview-config';
import { Directionality } from '@angular/cdk/bidi';
import { CdkPreviewContainer } from './preview-container';
import {
  ComponentType,
  Overlay,
  OverlayRef,
  OverlayConfig,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { startWith } from 'rxjs/operators';

import {
  PREVIEW_SCROLL_STRATEGY,
  PREVIEW_DATA,
  PREVIEW_REF,
  PREVIEW_CONTAINER,
  PREVIEW_CONFIG,
} from './preview-injectors';

/**
 * Service to open modal previews.
 */
@Injectable()
export class Preview implements OnDestroy {
  private _scrollStrategy: () => ScrollStrategy;

  /** Stream that emits when all previews are closed. */
  _getAfterAllClosed(): Observable<void> {
    return this._parentPreview
      ? this._parentPreview.afterAllClosed
      : this._afterAllClosedBase;
  }
  _afterAllClosedBase = new Subject<void>();

  // TODO(jelbourn): tighten the type on the right-hand side of this expression.
  afterAllClosed: Observable<void> = defer(() =>
    this.openPreviews.length
      ? this._getAfterAllClosed()
      : this._getAfterAllClosed().pipe(startWith(undefined))
  );

  /** Stream that emits when a preview is opened. */
  get afterOpened(): Subject<PreviewRef<any>> {
    return this._parentPreview
      ? this._parentPreview.afterOpened
      : this._afterOpened;
  }
  _afterOpened: Subject<PreviewRef<any>> = new Subject();

  /** Stream that emits when a preview is opened. */
  get openPreviews(): PreviewRef<any>[] {
    return this._parentPreview
      ? this._parentPreview.openPreviews
      : this._openPreviews;
  }
  _openPreviews: PreviewRef<any>[] = [];

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Inject(PREVIEW_REF) private _previewRefConstructor: Type<PreviewRef<any>>,
    // TODO(crisbeto): the `any` here can be replaced
    // with the proper type once we start using Ivy.
    @Inject(PREVIEW_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() private _parentPreview: Preview,
    @Optional() location: Location
  ) {
    // Close all of the previews when the user goes forwards/backwards in history or when the
    // location hash changes. Note that this usually doesn't include clicking on links (unless
    // the user is using the `HashLocationStrategy`).
    if (!_parentPreview && location) {
      location.subscribe(() => this.closeAll());
    }

    this._scrollStrategy = scrollStrategy;
  }

  /** Gets an open preview by id. */
  getById(id: string): PreviewRef<any> | undefined {
    return this._openPreviews.find((ref) => ref.id === id);
  }

  /** Closes all open previews. */
  closeAll(): void {
    this.openPreviews.forEach((ref) => ref.close());
  }

  /** Opens a preview from a component. */
  openFromComponent<T>(
    component: ComponentType<T>,
    config?: PreviewConfig
  ): PreviewRef<any> {
    config = this._applyConfigDefaults(config);

    if (
      config.id &&
      this.getById(config.id) &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(
        `Preview with id "${config.id}" exists already. The preview id must be unique.`
      );
    }

    const overlayRef = this._createOverlay(config);
    const previewContainer = this._attachPreviewContainer(overlayRef, config);
    const previewRef = this._attachPreviewContentForComponent(
      component,
      previewContainer,
      overlayRef,
      config
    );

    this._registerPreviewRef(previewRef);
    previewContainer._initializeWithAttachedContent();

    return previewRef;
  }

  /** Opens a preview from a template. */
  openFromTemplate<T>(
    template: TemplateRef<T>,
    config?: PreviewConfig
  ): PreviewRef<any> {
    config = this._applyConfigDefaults(config);

    if (
      config.id &&
      this.getById(config.id) &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(
        `Preview with id "${config.id}" exists already. The preview id must be unique.`
      );
    }

    const overlayRef = this._createOverlay(config);
    const previewContainer = this._attachPreviewContainer(overlayRef, config);
    const previewRef = this._attachPreviewContentForTemplate(
      template,
      previewContainer,
      overlayRef,
      config
    );

    this._registerPreviewRef(previewRef);
    previewContainer._initializeWithAttachedContent();

    return previewRef;
  }

  ngOnDestroy() {
    // Only close all the previews at this level.
    this._openPreviews.forEach((ref) => ref.close());
  }

  /**
   * Forwards emitting events for when previews are opened and all previews are closed.
   */
  private _registerPreviewRef(previewRef: PreviewRef<any>): void {
    this.openPreviews.push(previewRef);

    const previewOpenSub = previewRef.afterOpened().subscribe(() => {
      this.afterOpened.next(previewRef);
      previewOpenSub.unsubscribe();
    });

    const previewCloseSub = previewRef.afterClosed().subscribe(() => {
      let previewIndex = this._openPreviews.indexOf(previewRef);

      if (previewIndex > -1) {
        this._openPreviews.splice(previewIndex, 1);
      }

      if (!this._openPreviews.length) {
        this._afterAllClosedBase.next();
        previewCloseSub.unsubscribe();
      }
    });
  }

  /**
   * Creates an overlay config from a preview config.
   * @param config The preview configuration.
   * @returns The overlay configuration.
   */
  protected _createOverlay(config: PreviewConfig): OverlayRef {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._scrollStrategy(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      direction: config.direction,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
    });

    if (config.backdropClass) {
      overlayConfig.backdropClass = config.backdropClass;
    }
    return this._overlay.create(overlayConfig);
  }

  /**
   * Attaches an MatPreviewContainer to a preview's already-created overlay.
   * @param overlay Reference to the preview's underlying overlay.
   * @param config The preview configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  protected _attachPreviewContainer(
    overlay: OverlayRef,
    config: PreviewConfig
  ): CdkPreviewContainer {
    const container =
      config.containerComponent || this._injector.get(PREVIEW_CONTAINER);
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: PreviewConfig, useValue: config }],
    });
    const containerPortal = new ComponentPortal(
      container,
      config.viewContainerRef,
      injector
    );
    const containerRef: ComponentRef<CdkPreviewContainer> = overlay.attach(
      containerPortal
    );
    containerRef.instance._config = config;

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created MatPreviewContainer.
   * @param componentOrTemplateRef The type of component being loaded into the preview,
   *     or a TemplateRef to instantiate as the content.
   * @param previewContainer Reference to the wrapping MatPreviewContainer.
   * @param overlayRef Reference to the overlay in which the preview resides.
   * @param config The preview configuration.
   * @returns A promise resolving to the MatPreviewRef that should be returned to the user.
   */
  protected _attachPreviewContentForComponent<T>(
    componentOrTemplateRef: ComponentType<T>,
    previewContainer: CdkPreviewContainer,
    overlayRef: OverlayRef,
    config: PreviewConfig
  ): PreviewRef<any> {
    // Create a reference to the preview we're creating in order to give the user a handle
    // to modify and close it.
    const previewRef = this._createPreviewRef(
      overlayRef,
      previewContainer,
      config
    );
    const injector = this._createInjector<T>(
      config,
      previewRef,
      previewContainer
    );
    const contentRef = previewContainer.attachComponentPortal(
      new ComponentPortal(componentOrTemplateRef, undefined, injector)
    );
    previewRef.componentInstance = contentRef.instance;
    return previewRef;
  }

  /**
   * Attaches the user-provided component to the already-created MatPreviewContainer.
   * @param componentOrTemplateRef The type of component being loaded into the preview,
   *     or a TemplateRef to instantiate as the content.
   * @param previewContainer Reference to the wrapping MatPreviewContainer.
   * @param overlayRef Reference to the overlay in which the preview resides.
   * @param config The preview configuration.
   * @returns A promise resolving to the MatPreviewRef that should be returned to the user.
   */
  protected _attachPreviewContentForTemplate<T>(
    componentOrTemplateRef: TemplateRef<T>,
    previewContainer: CdkPreviewContainer,
    overlayRef: OverlayRef,
    config: PreviewConfig
  ): PreviewRef<any> {
    // Create a reference to the preview we're creating in order to give the user a handle
    // to modify and close it.
    const previewRef = this._createPreviewRef(
      overlayRef,
      previewContainer,
      config
    );
    previewContainer.attachTemplatePortal(
      new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
        $implicit: config.data,
        previewRef,
      })
    );
    return previewRef;
  }

  /**
   * Creates a custom injector to be used inside the preview. This allows a component loaded inside
   * of a preview to close itself and, optionally, to return a value.
   * @param config Config object that is used to construct the preview.
   * @param previewRef Reference to the preview.
   * @param container Preview container element that wraps all of the contents.
   * @returns The custom injector that can be used inside the preview.
   */
  private _createInjector<T>(
    config: PreviewConfig,
    previewRef: PreviewRef<T>,
    previewContainer: CdkPreviewContainer
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const providers: StaticProvider[] = [
      { provide: this._injector.get(PREVIEW_REF), useValue: previewRef },
      {
        provide: this._injector.get(PREVIEW_CONTAINER),
        useValue: previewContainer,
      },
      { provide: PREVIEW_DATA, useValue: config.data },
    ];

    if (
      config.direction &&
      (!userInjector ||
        !userInjector.get<Directionality | null>(Directionality, null))
    ) {
      providers.push({
        provide: Directionality,
        useValue: { value: config.direction, change: observableOf() },
      });
    }

    return Injector.create({
      parent: userInjector || this._injector,
      providers,
    });
  }

  /** Creates a new preview ref. */
  private _createPreviewRef(
    overlayRef: OverlayRef,
    previewContainer: CdkPreviewContainer,
    config: PreviewConfig
  ) {
    const previewRef = new this._previewRefConstructor(
      overlayRef,
      previewContainer,
      config.id
    );
    previewRef.disableClose = config.disableClose;
    previewRef.updateSize(config).updatePosition(config.position);
    return previewRef;
  }

  /**
   * Expands the provided configuration object to include the default values for properties which
   * are undefined.
   */
  private _applyConfigDefaults(config?: PreviewConfig): PreviewConfig {
    const previewConfig = this._injector.get(
      PREVIEW_CONFIG
    ) as typeof PreviewConfig;
    return { ...new previewConfig(), ...config };
  }
}
