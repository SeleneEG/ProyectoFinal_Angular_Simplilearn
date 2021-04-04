import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { AppRoutingModule } from './app-routing.module';
import { QuizzModule } from './quizz/quizz.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    PageModule,
    AppRoutingModule,
    QuizzModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
