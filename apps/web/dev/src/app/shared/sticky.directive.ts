import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';

@Directive({
  selector: '[guiseekSticky]',
})
export class StickyDirective implements AfterViewInit, OnDestroy {
  destroy$ = new Subject<void>();

  fixed = new BehaviorSubject<boolean>(false);
  fixed$ = this.fixed.asObservable();

  element: HTMLElement;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.element = this.el.nativeElement;

    fromEvent(window, 'scroll')
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => this.calcVisibility());

    this.fixed$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      if (state) {
        this.element.classList.add('fixed');
      } else {
        this.element.classList.remove('fixed');
      }
    });

    // $(window).scroll(function () {
    //   if ($(window).scrollTop() >= 300) {
    //     $('nav').addClass('fixed-header');
    //     $('nav div').addClass('visible-title');
    //   } else {
    //     $('nav').removeClass('fixed-header');
    //     $('nav div').removeClass('visible-title');
    //   }
    // });
  }

  calcVisibility() {
    const { top } = this.element.getBoundingClientRect();
    console.log(top, window.innerHeight, top <= window.innerHeight);

    if (top <= window.innerHeight && !this.fixed.value) {
      this.fixed.next(true);
      // this.destroy$.complete();
    } else {
      this.fixed.next(false);
    }
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
