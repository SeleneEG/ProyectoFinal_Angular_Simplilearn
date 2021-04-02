import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { passwordMatchValidator } from './validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  constructor(private route: Router) {}

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
    console.log('click on ' + event.item.label + ' tab!');
    this.content = event.item.label;
  }

  signin($event) {
    console.log(`Holis signin ${$event}`);
    if (this.signForm.valid) {
      this.route.navigateByUrl('/content');
    } else {
      this.signForm.markAllAsTouched();
    }
  }

  login($event) {
    console.log(`Holis login ${$event}`);
    if (this.loginForm.valid) {
      this.route.navigateByUrl('/content');
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
