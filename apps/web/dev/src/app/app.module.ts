import { FigureComponent } from './pages/photos/figure.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {
  PaperFormsModule,
  PaperLayoutModule,
  PaperNavbarModule,
  PaperTabsModule,
  PaperAutocompleteModule,
} from '@nx-ux/paper';
import { PhotosComponent } from './pages/photos/photos.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsesComponent } from './pages/uses/uses.component';
import { NotesComponent } from './pages/notes/notes.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ToolsComponent } from './pages/tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    FigureComponent,
    PhotosComponent,
    ArticlesComponent,
    ProjectsComponent,
    UsesComponent,
    NotesComponent,
    FeedbackComponent,
    ToolsComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    ScullyLibModule,
    PaperTabsModule,
    PaperFormsModule,
    PaperLayoutModule,
    PaperNavbarModule,
    PaperAutocompleteModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
