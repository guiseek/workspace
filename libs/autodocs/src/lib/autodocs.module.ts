import { DynamicModule } from './dynamic/dynamic.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidenavSectionComponent, SidenavComponent } from './containers';
import { PreviewContainer } from './containers/preview/preview.container';
import { AutodocsConfig, AUTODOCS_CONFIG } from './autodocs-injectors';
import { SourceComponent } from './containers/source';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PlatformModule,
    HttpClientModule,
    DynamicModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SidenavComponent,
    SidenavSectionComponent,
    PreviewContainer,
    SourceComponent,
  ],
  exports: [
    SidenavComponent,
    SidenavSectionComponent,
    PreviewContainer,
    SourceComponent,
  ],
})
export class AutodocsModule {
  static forRoot(config: AutodocsConfig): ModuleWithProviders<AutodocsModule> {
    return {
      ngModule: AutodocsModule,
      providers: [{ provide: AUTODOCS_CONFIG, useValue: config }],
    };
  }
}
