import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'guiseek-email',
  templateUrl: './email.form.html',
  styleUrls: ['./email.form.scss']
})
export class EmailForm implements OnInit {
  @Input() control: FormControl

  @Output() valueChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(this.valueChange)
  }

}
