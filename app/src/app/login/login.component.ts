import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { BackendService } from '../backend.service';

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

  constructor(private fb: FormBuilder, private backendService: BackendService) { }

  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      this.backendService.login(
        this.email, 
        this.password);
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
