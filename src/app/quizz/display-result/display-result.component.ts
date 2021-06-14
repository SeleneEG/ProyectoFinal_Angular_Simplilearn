import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css'],
})
export class DisplayResultComponent implements OnInit, AfterContentInit {
  @Input() quiz: Quizz;
  title: string;
  @Input() answers: { quizzNumber: number; answer: number }[];
  quizForm = new FormGroup({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.generateQuizForm(this.quiz);
  }

  ngAfterContentInit() {
    this.disabledForm(this.quiz, this.answers);
  }

  generateQuizForm(quiz: Quizz): void {
    quiz.elements.forEach((question) => {
      this.quizForm.addControl(
        'question_' + question.quizzNumber,
        new FormControl('', Validators.required)
      );
    });
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
    answers['answers'].forEach(
      (item: { quizzNumber: number; answer: number }) => {
        this.quizForm.controls['question_' + item.quizzNumber].setValue(
          item.answer
        );
      }
    );
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

  reviewQuiz() {
    this.router.navigate(['/content/review', this.quiz.id], {
      relativeTo: this.route,
    });
  }

  showTotalScore(): string {
    let totalScore: number = 0;
    this.quiz.elements.forEach((item, index) => {
      if (item.answer == this.answers['answers'][index].answer) {
        totalScore++;
      }
    });
    return `${this.quiz.title} (${totalScore} / ${this.quiz.elements.length}) `;
  }
}
