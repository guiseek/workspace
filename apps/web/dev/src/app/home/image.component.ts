import { AssetImage } from './../shared/types/shared-types';
import {
  Output,
  Input,
  OnInit,
  Component,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

export interface FigureState {
  visible: boolean;
  loaded: boolean;
}
const initial: FigureState = {
  visible: false,
  loaded: false,
};

@Component({
  selector: 'guiseek-figure',
  template: `
    <ng-container *ngIf="state$ | async as s">
      <figure *ngIf="s.visible">
        <img
          [hidden]="!s.loaded"
          (load)="onLoad()"
          [src]="img.src"
          [alt]="img.title"
          [width]="img?.width"
          [height]="img?.height"
        />
      </figure>
    </ng-container>
  `,
  styles: [
    `
      :host figure,
      :host figure > img {
        height: 100%;
      }
      :host figure > img {
        width: 100%;
        object-fit: cover;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class ImageComponent implements OnInit, AfterViewInit {
  destroy$ = new Subject<void>();

  @Input() img: AssetImage;

  state = new BehaviorSubject<FigureState>(initial);
  state$ = this.state.asObservable();

  @Output() loaded = new EventEmitter<boolean>();

  constructor(private el: ElementRef<HTMLElement>) {}

  setState(key: keyof FigureState, value: boolean) {
    this.state.next({ ...this.state.value, [key]: value });
  }

  ngOnInit() {
    this.calcVisibility();
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => this.calcVisibility());
  }

  calcVisibility() {
    const element = this.el.nativeElement;
    const { visible } = this.state.value;
    const { top } = element.getBoundingClientRect();
    if (top <= window.innerHeight && !visible) {
      this.setState('visible', true);
      this.loaded.emit(true);
      this.destroy$.complete();
    }
  }

  onLoad() {
    this.setState('loaded', true);
  }
}
