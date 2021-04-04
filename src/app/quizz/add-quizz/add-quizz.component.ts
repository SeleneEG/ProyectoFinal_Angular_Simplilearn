import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizItem } from 'src/app/models/quiz-item';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css'],
})
export class AddQuizzComponent implements OnInit {
  questions: QuizItem[] = [];

  // {
  //   quizzNumber: 1,
  //   question: 'question a',
  //   option1: 'option1 a1',
  //   option2: 'option2 a2',
  //   option3: 'option3 a3',
  //   answer: 1,
  // },
  // {
  //   quizzNumber: 2,
  //   question: 'question b',
  //   option1: 'option1 b',
  //   option2: 'option2 b',
  //   option3: 'option3 b',
  //   answer: 2,
  // },
  // {
  //   quizzNumber: 3,
  //   question: 'question c',
  //   option1: 'option1 c',
  //   option2: 'option2 c',
  //   option3: 'option3 c',
  //   answer: 3,
  // },

  editItem: QuizItem = null;
  noAnswerChecked: boolean = false;
  questionDialog: boolean;
  question: QuizItem;
  selectedQuestions: QuizItem[] = [];
  submitted: boolean;

  quizForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required),
  });

  questionForm = new FormGroup({
    question: new FormControl('', Validators.required),
    option1: new FormControl('', Validators.required),
    option2: new FormControl('', Validators.required),
    option3: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });

  correctAnswer: any[] = [
    { name: 'A', key: 'A' },
    { name: 'A', key: 'M' },
    { name: 'A', key: 'P' },
    { name: 'A', key: 'R' },
  ];

  categories: { key: string; value: string }[] = [
    { key: 'cat1', value: 'Category 1' },
    { key: 'cat2', value: 'Category 2' },
    { key: 'cat3', value: 'Category 3' },
  ];

  difficultyArray: { key: string; value: string }[] = [
    { key: 'HIGH', value: 'High' },
    { key: 'MEDIUM', value: 'Medium' },
    { key: 'LOW', value: 'Low' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  saveQuiz() {
    if (this.quizForm.valid) {
    } else {
      this.quizForm.markAllAsTouched();
      if (this.questions.length == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please enter at least one question',
          life: 3000,
        });
      }
    }
  }

  openNew() {
    this.question = null;
    this.submitted = false;
    this.questionDialog = true;
    this.noAnswerChecked = false;
  }

  hideDialog() {
    this.questionDialog = false;
    this.submitted = false;
    this.questionForm.reset();
    this.noAnswerChecked = false;
  }

  saveQuestion() {
    if (this.questionForm.valid) {
      let item: QuizItem = {
        quizzNumber: this.questions.length + 1,
        question: this.questionForm.controls['question'].value,
        option1: this.questionForm.controls['option1'].value,
        option2: this.questionForm.controls['option2'].value,
        option3: this.questionForm.controls['option3'].value,
        answer: this.questionForm.controls['answer'].value,
      };

      if (!this.editItem) {
        this.questions.push(item);

        this.hideDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Question Added',
          life: 3000,
        });
      } else {
        let editQuestions = this.questions.map((i) => {
          if (i.quizzNumber == this.editItem.quizzNumber) {
            return {
              quizzNumber: i.quizzNumber,
              question: this.questionForm.controls['question'].value,
              option1: this.questionForm.controls['option1'].value,
              option2: this.questionForm.controls['option2'].value,
              option3: this.questionForm.controls['option3'].value,
              answer: this.questionForm.controls['answer'].value,
            };
          } else {
            return i;
          }
        });

        this.questions = editQuestions;
        this.editItem = null;
        this.hideDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Question Edited',
          life: 3000,
        });
      }
    } else {
      this.questionForm.markAllAsTouched();
      if (!this.questionForm.controls['answer'].value) {
        this.noAnswerChecked = true;
      }
    }
  }

  editQuestion(question: QuizItem) {
    this.questionForm.controls['question'].setValue(question.question);
    this.questionForm.controls['option1'].setValue(question.option1);
    this.questionForm.controls['option2'].setValue(question.option2);
    this.questionForm.controls['option3'].setValue(question.option3);
    this.questionForm.controls['answer'].setValue(question.answer);
    this.editItem = question;
    this.questionDialog = true;
  }

  deleteQuestion(question: QuizItem) {
    let filtrados = this.questions.filter((i) => {
      return i.quizzNumber !== question.quizzNumber;
    });

    let reNumerados = filtrados.map((i, index) => {
      return {
        ...i,
        quizzNumber: index + 1,
      };
    });

    this.questions = reNumerados;
  }
}
