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
            label: 'Show all',
            icon: 'pi pi-fw pi-trash',
            command: (event) => {
              this.route.navigateByUrl('/content/user-quizz');
            },
          },
        ],
      },
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            command: (event) => {
              console.log(`Navega a edit user info`);
            },
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
    ];
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.route.navigateByUrl('/login');
  }
}
