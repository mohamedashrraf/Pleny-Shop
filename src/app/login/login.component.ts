import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!:FormGroup;
  InvalidUserError!: boolean;

  constructor(
    private formbuilder:FormBuilder,
    private auth:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }


  initLoginForm()
  {
    this.loginForm = this.formbuilder.group({
      username: ['' , Validators.required],
      password: ['' , Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      this.auth.Loader.next(true);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res?.token)
          {
            this.setItem('User', JSON.stringify(res));
            this.auth.userValidaty.next(true);
            this.router.navigate(['/products']);
          }
          this.auth.Loader.next(false);
        },
        error: (err) => {
          console.log(err);
          this.InvalidUserError = true;
          this.auth.Loader.next(false);
        }
      })

    }else{
      Object.keys(this.loginForm.controls).forEach(field => {
        this.loginForm.controls[field].markAllAsTouched();
      })
    }
  }

    setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }
}
