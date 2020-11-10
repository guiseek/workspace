import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { Preview } from './preview';
import { CdkPreviewContainer } from './preview-container';
import { PreviewConfig } from './preview-config';
import { PreviewRef } from './preview-ref';
import {
  PREVIEW_CONFIG,
  PREVIEW_CONTAINER,
  PREVIEW_REF,
  SEEK_PREVIEW_SCROLL_STRATEGY_PROVIDER,
} from './preview-injectors';

@NgModule({
  imports: [OverlayModule, PortalModule, A11yModule],
  exports: [
    // Re-export the PortalModule so that people extending the `CdkPreviewContainer`
    // don't have to remember to import it or be faced with an unhelpful error.
    PortalModule,
    CdkPreviewContainer,
  ],
  declarations: [CdkPreviewContainer],
  providers: [
    Preview,
    SEEK_PREVIEW_SCROLL_STRATEGY_PROVIDER,
    { provide: PREVIEW_REF, useValue: PreviewRef },
    { provide: PREVIEW_CONTAINER, useValue: CdkPreviewContainer },
    { provide: PREVIEW_CONFIG, useValue: PreviewConfig },
  ],
  entryComponents: [CdkPreviewContainer],
})
export class PreviewModule {}
