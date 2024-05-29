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
hide = true;
hideConfirm = true;

password: string = '';
confirmPassword: string = '';
company: string = 'FH Technikum Wien';
adress: string = '';
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
  password: new FormControl(this.password, [
    Validators.required,
    Validators.minLength(8)
  ]),
  confirmPassword: new FormControl(this.confirmPassword, [
    Validators.required,
    Validators.minLength(8)
  ]),
  company: new FormControl("FH Technikum Wien", 
    Validators.pattern("FH Technikum Wien")
),
  adress: new FormControl(this.adress),
  city: new FormControl(this.city),
  zip: new FormControl(this.email, 
    Validators.pattern(/^[0-9]*$/)
  )
},{ validators: this.passwordMatchValidator });

register() {
  if (this.signupForm.valid) {
    console.log('Form Submitted!', this.signupForm.value);
  }
  else {
    console.log('Form not valid!');
  }
}

get form(): { [key: string]: AbstractControl; } {
  return this.signupForm.controls;
}

passwordMatchValidator(formGroup: FormGroup) {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (passwordControl && confirmPasswordControl) {
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
}
}

