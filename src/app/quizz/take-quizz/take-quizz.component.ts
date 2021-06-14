import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-take-quizz',
  templateUrl: './take-quizz.component.html',
  styleUrls: ['./take-quizz.component.css'],
})
export class TakeQuizzComponent implements OnInit {
  quizId: number;
  @Input() quiz: Quizz;
  title: string;
  quizForm = new FormGroup({});
  checkAnswers: boolean = false;
  @Output() userAnswers: EventEmitter<
    { quizzNumber: number; answer: number }[]
  > = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.title = this.quiz.title;
    this.generateQuizForm(this.quiz);
  }

  generateQuizForm(quiz: Quizz): void {
    quiz.elements.forEach((question) => {
      this.quizForm.addControl(
        'question_' + question.quizzNumber,
        new FormControl('', Validators.required)
      );
    });
  }

  sendQuiz() {
    this.quizForm.markAllAsTouched();
    if (this.quizForm.valid) {
      let answers: { quizzNumber: number; answer: number }[] = [];

      this.checkAnswers = true;
      this.quiz.elements.forEach((question) => {
        answers.push({
          quizzNumber: question.quizzNumber,
          answer:
            +this.quizForm.controls['question_' + question.quizzNumber].value,
        });
      });

      let userAnswersAux: any = { answers: answers };
      this.userAnswers.emit(userAnswersAux);
    } else {
      this.quizForm.markAllAsTouched();
    }
  }

  showInvalidState(quizzNumber: number): boolean {
    return (
      this.quizForm.controls['question_' + quizzNumber].hasError('required') &&
      this.quizForm.controls['question_' + quizzNumber].touched
    );
  }
}
