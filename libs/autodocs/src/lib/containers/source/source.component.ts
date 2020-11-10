import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';
import 'clipboard';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

@Component({
  selector: `
    autodocs-source,
    [autodocsSource]
  `,
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
})
export class SourceComponent implements AfterViewInit {
  @Input() code: string;

  @Input() lang = 'ts';
  @HostBinding('attr.class') get language() {
    return `language-${this.lang}`;
  }

  constructor(
    private elRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const host = this.elRef.nativeElement;
      const code = host.querySelector('code');
      if (code) Prism.highlightElement(code);
    }
  }
}
