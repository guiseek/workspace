import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form = new FormGroup({
    check1: new FormControl(false),
    check2: new FormControl(true),
    checks: new FormControl([]),
    input1: new FormControl('paper/v1.1.1'),
    input2: new FormControl('hahaha')
  })
  constructor() { }

  ngOnInit() {
  }

}
