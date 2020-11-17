import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForm } from './password.form';

describe('PasswordForm', () => {
  let component: PasswordForm;
  let fixture: ComponentFixture<PasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
