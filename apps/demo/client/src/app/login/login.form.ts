import { FormBuilder } from '@angular/forms';
import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'guiseek-login',
  templateUrl: './login.form.html',
  styleUrls: ['./login.form.scss'],
})
export class LoginForm implements OnInit {
  @HostBinding('class.logged')
  isLogged = false;

  form = this.builder.group({
    email: [],
    password: [],
  });

  @Output() submitted = new EventEmitter();

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLogged = true;
    this.submitted.emit('uhu')
  }
}
