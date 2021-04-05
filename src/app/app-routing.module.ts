import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './page/content/content.component';
import { AddQuizzComponent } from './quizz/add-quizz/add-quizz.component';
import { AllQuizzComponent } from './quizz/all-quizz/all-quizz.component';
import { TakeQuizzComponent } from './quizz/take-quizz/take-quizz.component';
import { UserQuizzComponent } from './quizz/user-quizz/user-quizz.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      { path: 'add-quizz', component: AddQuizzComponent },
      { path: 'user-quizz', component: UserQuizzComponent },
      { path: 'take-quizz/:id', component: TakeQuizzComponent },
      { path: 'all-quizz', component: AllQuizzComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
