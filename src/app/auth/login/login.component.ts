import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from './validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  checkLoginInfo: boolean = false;
  checkSigninInfo: boolean = false;
  items: MenuItem[];
  activeItem: MenuItem;
  content: string;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  signForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        command: (event) => {
          this.activateMenu(event);
        },
      },
      {
        label: 'Signin',
        icon: 'pi pi-fw pi-user-plus',
        command: (event) => {
          this.activateMenu(event);
        },
      },
    ];
    this.activeItem = this.items[0];
    this.content = 'Login';

    this.signForm.setValidators(passwordMatchValidator());
  }

  activateMenu(event) {
    this.content = event.item.label;
  }

  signin($event) {
    if (this.signForm.valid) {
      this.userService
        .getUserPorUsername(this.signForm.get('username').value)
        .subscribe((resp: any) => {
          if (resp.length > 0) {
            this.checkSigninInfo = true;
          } else {
            this.checkSigninInfo = false;
            let user: User = {
              username: this.signForm.get('username').value,
              password: this.signForm.get('password').value,
              email: this.signForm.get('email').value,
            };
            this.userService.createUser(user).subscribe(() => {
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigateByUrl('/login');
            });
          }
        });
    } else {
      this.signForm.markAllAsTouched();
    }
  }

  login($event) {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.userService.login(username, password).subscribe((resp: any) => {
        if (resp.length > 0) {
          localStorage.setItem('username', (resp[0] as User).username);
          localStorage.setItem('userId', '' + (resp[0] as User).id);
          this.route.navigateByUrl('/content');
        } else {
          this.checkLoginInfo = true;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
