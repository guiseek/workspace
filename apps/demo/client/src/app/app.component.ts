import { LoginForm } from './login/login.form';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Type } from '@angular/core';
import { EmailForm } from './forms/email/email.form';
import { HttpClient } from '@angular/common/http';

interface DynamicComponentItem {
  name: string;
  component: Type<any>;
  inputs?: any;
  outputs?: any;
}

@Component({
  selector: 'guiseek-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo-client';

  forms: DynamicComponentItem[] = [
    {
      name: 'email',
      component: EmailForm,
      inputs: {
        control: new FormControl('oie'),
      },
      outputs: {
        valueChange: (evt) => {
          console.log('evt: ', evt);
        },
      },
    },
    {
      name: 'login',
      component: LoginForm,
      inputs: {},
      outputs: {
        submitted: alert.bind(this)
      },
    },
  ];
  current: DynamicComponentItem;

  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  data = {
    component: EmailForm,
    inputs: {
      control: this.form.get('email'),
    },
  };
  constructor(private http: HttpClient) {}

  setComponent(item: DynamicComponentItem) {
    this.current = item;
  }

  ngOnInit(): void {
    this.http.get('assets/docs.json').subscribe((docs) => {
      console.log(docs);
    });
    setTimeout(() => {});
  }
}
