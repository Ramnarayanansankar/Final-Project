import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  returnUrl: any;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit(loginformValue: FormGroup) {
    this.authService
      .login({
        username: loginformValue.value.username,
        password: loginformValue.value.password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.authService.loginStatus = true;
          this.router.navigate(['/dashboard']);

        },
        error: (err) => {
          this.loginForm.reset();
        },
      });
  }
}
