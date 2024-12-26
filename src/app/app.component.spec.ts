import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideRouter} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
      ],
      providers: [
        provideRouter([
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: '', component: RegisterComponent},
        ])
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'angular-appwrite-integration' title`, () => {
    expect(component.title).toEqual('angular-appwrite-integration');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular Appwrite');
  });

  it('should have a logo with correct src', () => {
    const logoImg = fixture.debugElement.query(By.css('.logo img')).nativeElement;
    expect(logoImg.src).toContain('angular.love/assets/angular-love-logo.webp');
  })

  it('should have the correct navigation link', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav a'));
    const registerLink = links[0].nativeElement;
    const loginLink = links[1].nativeElement;

    expect(registerLink.getAttribute('routerLink')).toBe('/register');
    expect(loginLink.getAttribute('routerLink')).toBe('/login');
  })
});
