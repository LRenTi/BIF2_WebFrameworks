import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = "";
  password = "";
  hide = true;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.email,
      Validators.minLength(4)
    ]),
    password: new FormControl(this.password, [
      Validators.required,
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.email === 'test@test.com' && this.loginForm.value.password === '12345678') {
        console.log('Login successful!', this.loginForm.value);
      }
      else {
        console.log('Login failed!', this.loginForm.value);
      }
    }
    else {
      console.log('Form not valid!', this.loginForm.value);
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
