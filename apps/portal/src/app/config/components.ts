import { Type } from '@angular/core';
import {
  CheckboxComponent,
  CheckboxGroupComponent,
  EnterPasswordComponent,
  InputComponent,
  FormGroupComponent,
  NavbarComponent,
  TabsComponent,
  TabComponent,
} from '@nx-ux/paper';

export const components = new Map<string, Type<any>>([
  ['EnterPasswordComponent', EnterPasswordComponent],
  ['CheckboxGroupComponent', CheckboxGroupComponent],
  ['CheckboxComponent', CheckboxComponent],
  ['InputComponent', InputComponent],
  ['FormGroupComponent', FormGroupComponent],
  ['NavbarComponent', NavbarComponent],
  ['TabsComponent', TabsComponent],
  ['TabComponent', TabComponent],
]);
