import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [MenuComponent, ContentComponent, FooterComponent],
  imports: [CommonModule],
})
export class PageModule {}
