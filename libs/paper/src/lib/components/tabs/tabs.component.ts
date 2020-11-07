import {
  AfterContentInit,
  ContentChildren,
  OnDestroy,
  QueryList,
  Component,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabComponent } from './tab.component';

@Component({
  selector: 'div[ux-tabs]',
  template: `
    <div uxRow="spaces" role="tablist" class="tabs">
      <ng-content select="label[ux-tab]"></ng-content>
      <ng-content select="section[ux-tab-content]"></ng-content>
    </div>
  `,
})
export class TabsComponent implements OnDestroy, AfterContentInit {
  static nextId = 0;
  private _destroy$ = new Subject<void>();

  @Input()
  name: string;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    if (!this.tabs.some((t) => t.active)) {
      this.tabs.first.active = true;
    }
    this.tabs.map((tab) => {
      tab.name = this.name ? this.name : `paper-tabs${TabsComponent.nextId++}`;
      tab.selected
        .pipe(takeUntil(this._destroy$))
        .subscribe((t) => this.changeChecked(t));
    });
  }

  changeChecked(tab: TabComponent) {
    this.tabs.map((t) => (t.active = false));
    tab.active = true;
  }

  ngOnDestroy() {
    this._destroy$.complete();
  }
}
