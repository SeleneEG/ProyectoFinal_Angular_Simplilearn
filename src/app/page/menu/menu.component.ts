import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Quizz',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {
              this.route.navigateByUrl('/content/add-quizz');
            },
          },
          {
            label: 'Your Quizzes',
            icon: 'pi pi-fw pi-bars',
            command: (event) => {
              this.route.navigateByUrl('/content/user-quizz');
            },
          },
        ],
      },
      {
        label: 'Take Quizz',
        icon: 'pi pi-fw pi-question',
        command: (event) => {
          this.route.navigateByUrl('/content/all-quizz');
        },
      },
      {
        label: `${localStorage.getItem('username')}`,
        icon: 'pi pi-fw pi-user',
      },
    ];
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.route.navigateByUrl('/login');
  }
}
