import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight.pipe';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AutocompleteComponent, HighlightPipe],
  exports: [AutocompleteComponent, HighlightPipe],
})
export class AutocompleteModule {}
