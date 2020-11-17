import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmailForm } from '../email/email.form';

@Component({
  selector: 'guiseek-phone',
  templateUrl: './phone.form.html',
  styleUrls: ['./phone.form.scss']
})
export class PhoneForm implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
