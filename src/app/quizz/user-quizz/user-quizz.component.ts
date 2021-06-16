import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
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
  constructor(
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

  editQuiz(quiz) {
    console.log(`editQuiz(quiz) ${JSON.stringify(quiz)}`);
  }
  deleteQuiz(quiz) {
    console.log(`deleteQuiz(quiz) ${JSON.stringify(quiz)}`);
  }
  quizFeddback(quiz) {
    console.log(`quizFeddback(quiz) ${JSON.stringify(quiz)}`);
  }

  getItems(quiz: Quizz) {
    return (this.items = [
      {
        label: 'Feedback',
        icon: 'pi pi-eye',
        command: () => {
          this.quizFeddback(quiz);
        },
      },
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
