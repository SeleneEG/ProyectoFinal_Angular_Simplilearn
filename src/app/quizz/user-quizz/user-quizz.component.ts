import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';

import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-user-quizz',
  templateUrl: './user-quizz.component.html',
  styleUrls: ['./user-quizz.component.css'],
})
export class UserQuizzComponent implements OnInit {
  quizzes: Quizz[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.quizService
      .getQuizByUserId(+localStorage.getItem('userId'))
      .subscribe((resp) => {
        this.quizzes = resp;
      });
  }

  editQuiz(quiz) {}
  deleteQuiz(quiz) {}
}
