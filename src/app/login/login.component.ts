import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private httpservice: HttpService) {}
  group = new FormGroup({
    cUsernameControl: new FormControl('', [Validators.required]),
    cPasswordControl: new FormControl('', [Validators.required]),
  });
  showSpinner: boolean = false;

  email: string = '';
  password: string = '';
  error: any;

  onLogin() {
    this.httpservice.login(this.email, this.password).subscribe((data) => {
      console.log(data);
      localStorage.setItem('login', JSON.stringify(data));
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    });
  }
}
