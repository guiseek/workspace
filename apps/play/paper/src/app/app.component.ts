import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'guiseek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'play-paper';

  form = new FormGroup({
    check1: new FormControl(true),
    check2: new FormControl(),
    input1: new FormControl('hahaha'),
    input2: new FormControl()
  })
}
