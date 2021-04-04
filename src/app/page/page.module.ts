import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MenuComponent, ContentComponent, FooterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    FontAwesomeModule,
  ],
})
export class PageModule {}
