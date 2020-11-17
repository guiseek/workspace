import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { PasswordForm } from '../../forms/password/password.form';

@Component({
  selector: 'guiseek-preview',
  templateUrl: './preview.container.html',
  styleUrls: ['./preview.container.scss'],
})
export class PreviewContainer implements OnInit {
  form = this._fb.group({});
  components = [
    {
      label: 'Password',
      component: PasswordForm,
      inputs: {
        disabled: true,
      },
    },
  ];

  currents = [];

  current = {
    label: 'Password',
    component: PasswordForm,
    inputs: {
      disabled: true,
    },
  };
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({});
  }
  dropped(evt) {
    console.log(evt);

  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
