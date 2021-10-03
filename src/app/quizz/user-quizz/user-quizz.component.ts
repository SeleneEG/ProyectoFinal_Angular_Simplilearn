import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-quizz',
  templateUrl: './user-quizz.component.html',
  styleUrls: ['./user-quizz.component.css'],
})
export class UserQuizzComponent implements OnInit {
  quizzes: Quizz[] = [];
  items: MenuItem[];
  val = 0;
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private quizService: QuizzService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.quizService
      .getQuizByUserId(+localStorage.getItem('userId'))
      .subscribe((resp) => {
        this.quizzes = resp;
        this.quizzes.forEach((quiz) => {
          this.reviewService.getQuizReviews(quiz.id).subscribe((reviews) => {
            let average: number = 0;
            reviews.forEach((review) => {
              average = average + review.rating;
            });
            average = Math.round(average / reviews.length);
            quiz.averageRating = average;
          });
        });
      });
  }

  deleteQuiz(quiz) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this quiz?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.quizService.deleteQuiz(quiz.id).subscribe((resp) => {
          this.quizService
            .getQuizByUserId(+localStorage.getItem('userId'))
            .subscribe((updateQuiz) => {
              this.quizzes = updateQuiz;
              this.quizzes.forEach((quiz) => {
                this.reviewService
                  .getQuizReviews(quiz.id)
                  .subscribe((reviews) => {
                    let average: number = 0;
                    reviews.forEach((review) => {
                      average = average + review.rating;
                    });
                    average = Math.round(average / reviews.length);
                    quiz.averageRating = average;
                  });
              });
              this.messageService.add({
                severity: 'success',
                summary: 'Confirmed',
                detail: `Record deleted`,
                life: 3000,
              });
            });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Rejected',
          detail: `You have rejected`,
          life: 3000,
        });
      },
    });
  }
  quizFeddback(quiz) {
    this.reviewService.getQuizReviews(quiz.id).subscribe((reviews) => {
      if (reviews.length > 0) {
        this.router.navigate(['../display-review', quiz.id], {
          relativeTo: this.route,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'No Feedback',
          detail: `The quiz has no reviews`,
          life: 3000,
        });
      }
    });
  }

  getItems(quiz: Quizz) {
    return (this.items = [
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.deleteQuiz(quiz);
        },
      },
    ]);
  }
}
