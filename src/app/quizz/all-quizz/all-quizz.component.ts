import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-all-quizz',
  templateUrl: './all-quizz.component.html',
  styleUrls: ['./all-quizz.component.css'],
})
export class AllQuizzComponent implements OnInit {
  quizzes: Quizz[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  takeQuiz(quiz) {
    this.router.navigate(['../take-quizz', quiz.id], {
      relativeTo: this.route,
    });
  }
}
