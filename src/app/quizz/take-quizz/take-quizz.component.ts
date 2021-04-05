import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-take-quizz',
  templateUrl: './take-quizz.component.html',
  styleUrls: ['./take-quizz.component.css'],
})
export class TakeQuizzComponent implements OnInit {
  quizId: number;
  quiz: Quizz;
  title: string;
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'];
      this.quizService.getQuizById(this.quizId).subscribe((item) => {
        this.quiz = item;
        this.title = this.quiz.title;
      });
    });
  }

  sendQuiz() {}
}
