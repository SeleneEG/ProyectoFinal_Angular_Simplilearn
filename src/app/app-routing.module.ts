import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './page/content/content.component';
import { AddQuizzComponent } from './quizz/add-quizz/add-quizz.component';
import { AllQuizzComponent } from './quizz/all-quizz/all-quizz.component';
import { DisplayResultComponent } from './quizz/display-result/display-result.component';
import { DisplayReviewComponent } from './quizz/display-review/display-review.component';
import { ReviewComponent } from './quizz/review/review.component';
import { TakeQuizzPageComponent } from './quizz/take-quizz-page/take-quizz-page.component';
import { TakeQuizzComponent } from './quizz/take-quizz/take-quizz.component';
import { UserQuizzComponent } from './quizz/user-quizz/user-quizz.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'content',
    component: ContentComponent,
    children: [
      { path: '', component: UserQuizzComponent },
      { path: 'add-quizz', component: AddQuizzComponent },
      { path: 'user-quizz', component: UserQuizzComponent },
      { path: 'take-quizz/:id', component: TakeQuizzPageComponent },
      { path: 'review/:id', component: ReviewComponent },
      { path: 'all-quizz', component: AllQuizzComponent },
      { path: 'display-review/:id', component: DisplayReviewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
