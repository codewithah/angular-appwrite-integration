import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {By} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {LoginComponent} from '../login/login.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideRouter([
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: '', component: RegisterComponent},
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
