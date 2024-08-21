import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HttpService } from '../http.service';
import { Role } from '../role';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  type: string = '';
  firstName: string = '';
  lastName: string = '';
  rePassword: string = '';
  result: any;

  constructor(private httpservice: HttpService) {}
  validatePasswordMatch = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = this.group?.get('cPasswordControl')?.value as string;
    const passwordConfirm = control.value as string;

    if (password !== passwordConfirm) {
      return { passwordMatch: true };
    }

    return null;
  };
  group = new FormGroup({
    cUsernameControl: new FormControl('', [Validators.required]),
    cPasswordControl: new FormControl('', [Validators.required]),
    cTypeControl: new FormControl('', [Validators.required]),
    cFirstNameControl: new FormControl('', [Validators.required]),
    cLastNameControl: new FormControl('', [Validators.required]),
    cRePasswordControl: new FormControl('', [
      Validators.required,
      this.validatePasswordMatch,
    ]),
  });

  onRegister() {
    this.httpservice
      .signup(
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.type.toUpperCase()
      )

      .subscribe((res: any) => {
        this.result = 'Registration successful';
        console.log(res);
      });
  }
}
