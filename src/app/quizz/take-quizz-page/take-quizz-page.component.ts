import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-take-quizz-page',
  templateUrl: './take-quizz-page.component.html',
  styleUrls: ['./take-quizz-page.component.css'],
})
export class TakeQuizzPageComponent implements OnInit {
  showResults: boolean = false;
  quizId: number;
  quiz: Quizz;
  answers: { quizzNumber: number; answer: number }[] = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'];
      this.quizService.getQuizById(this.quizId).subscribe((item) => {
        this.quiz = item;
      });
    });
  }

  onUserAnswers(userAnswers: { quizzNumber: number; answer: number }[]) {
    this.answers = userAnswers;
  }
}
