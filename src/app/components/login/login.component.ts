import { Component } from '@angular/core';
import {AppwriteService} from '../../services/appwrite.service';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  isPasswordVisible = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private appwriteService: AppwriteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }

  async onLogin() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.error = '';

    try {
      const { email, password } = this.form.value;
      const response = await this.appwriteService.login(email, password);

      if (this.form.value.rememberMe) {
        localStorage.setItem('rememberUser', 'true');
      }

      console.log('Logged in:', response);
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Error:', error);
      this.error = error.message || 'An error occurred during login';
    } finally {
      this.isLoading = false;
    }
  }
}
