import { EmptyExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
email: string = '';
password: string = '';
confirmPassword: string = '';
company: string = 'FH Technikum Wien';
street: string = '';
city: string = '';
zip: string = '';

constructor(private fb: FormBuilder) { }

ngOnInit(): void { }

signupForm: FormGroup = this.fb.group({
  email: new FormControl(this.email, [
    Validators.required,
    Validators.email,
    Validators.minLength(4)
  ]),
  password: new FormControl(''),
  confirmPassword: new FormControl(''),
  company: new FormControl(this.company),
  street: new FormControl(this.street),
  city: new FormControl(this.city),
  zip: new FormControl(this.zip)
});

register() {
  console.log(this.signupForm.value);
}

get form(): { [key: string]: AbstractControl; } {
  return this.signupForm.controls;
}

}

