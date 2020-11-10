import { Component, OnInit } from '@angular/core';
import { CompodocService } from '@nx-feat/autodocs';

@Component({
  selector: 'portal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  docs$ = this.doc.getDocs();
  constructor(private doc: CompodocService) {}

  ngOnInit(): void {}
}
