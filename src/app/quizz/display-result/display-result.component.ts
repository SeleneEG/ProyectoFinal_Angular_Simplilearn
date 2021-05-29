import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css'],
})
export class DisplayResultComponent implements OnInit {
  quizId: number;
  @Input() quiz: Quizz;
  title: string;
  @Input() answers: { quizzNumber: number; answer: number }[];
  quizForm = new FormGroup({});
  texto: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.generateQuizForm(this.quiz, this.answers);
  }

  generateQuizForm(
    quiz: Quizz,
    answers: { quizzNumber: number; answer: number }[]
  ): void {
    quiz.elements.forEach((question) => {
      this.quizForm.addControl(
        'question_' + question.quizzNumber,
        new FormControl('', Validators.required)
      );
    });
    this.disabledForm(quiz, answers);
  }

  disabledForm(
    quiz: Quizz,
    answers: { quizzNumber: number; answer: number }[]
  ) {
    quiz.elements.forEach((question) => {
      this.quizForm.controls['question_' + question.quizzNumber].disable();
    });
    this.setUserAnswers(quiz, answers);
  }

  setUserAnswers(
    quiz: Quizz,
    answers: { quizzNumber: number; answer: number }[]
  ) {
    quiz.elements.forEach((question) => {
      this.quizForm.controls['question_' + question.quizzNumber].setValue(1);
    });
  }

  checkAnswer(quizzNumber: number): boolean {
    return (
      this.quiz.elements
        .filter((question) => question.quizzNumber == quizzNumber)
        .shift().answer ==
      +this.quizForm.controls['question_' + quizzNumber].value
    );
  }

  showAsCorrectAnswer(quizzNumber: number, option: number): boolean {
    return (
      this.quiz.elements
        .filter((question) => question.quizzNumber == quizzNumber)
        .shift().answer == +option
    );
  }

  reviewQuiz() {}
}
