import { Component, ViewEncapsulation } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'guiseek-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent {
  public hasPost = this.route.snapshot.paramMap.has('slug');
  posts$ = this.scully.available$.pipe(
    map((route) => route.filter((r) => r.route))
  );
  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute
  ) {}
}
