import { Component } from '@angular/core';
import {AppwriteService} from '../../services/appwrite.service';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
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
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$')
      ]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get acceptTerms() {
    return this.form.get('acceptTerms');
  }

  getNameErrorMessage(): string {
    if (this.name?.hasError('required')) {
      return 'Name is required';
    }
    if (this.name?.hasError('minlength')) {
      return 'Name must be at least 2 characters long';
    }
    return '';
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
    if (this.password?.hasError('pattern')) {
      return 'Password must include uppercase, lowercase, and number';
    }
    return '';
  }

  hasLowerCase(str: string): boolean {
    return /[a-z]/.test(str);
  }

  hasUpperCase(str: string): boolean {
    return /[A-Z]/.test(str);
  }

  hasNumber(str: string): boolean {
    return /\d/.test(str);
  }

  async onRegister() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.error = '';

    try {
      const { email, password, name } = this.form.value;
      const response = await this.appwriteService.createAccount(email, password, name);

      console.log('Account created:', response);
      await this.router.navigate(['/login'], {
        queryParams: {
          registered: 'true',
          email
        }
      });
    } catch (error: any) {
      console.error('Error:', error);
      this.error = error.message || 'An error occurred during registration';
    } finally {
      this.isLoading = false;
    }
  }
}
