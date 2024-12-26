import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {provideRouter} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: '', component: RegisterComponent},
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a input with type of email', () => {
    const control = component.form.get('email');
    expect(control).toBeTruthy();
  });

  it('should have a input with type of password', () => {
    const control = component.form.get('password');
    expect(control).toBeTruthy();
  });

  it('should have a button for login', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy();
  });
});
