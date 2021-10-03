import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuizItem } from 'src/app/models/quiz-item';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizCategoryService } from 'src/app/services/quiz-category.service';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { JsonPipe } from '@angular/common';
import { QuizCategory } from 'src/app/models/quiz-category';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css'],
})
export class AddQuizzComponent implements OnInit {
  questions: QuizItem[] = [];
  jsonFile: File = null;
  fileContent: JSON = null;
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

  categories: QuizCategory[] = [];

  difficultyArray: { key: string; value: string }[] = [
    { key: 'High', value: 'High' },
    { key: 'Medium', value: 'Medium' },
    { key: 'Low', value: 'Low' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private quizCategoryService: QuizCategoryService,
    private quizService: QuizzService
  ) {}

  ngOnInit(): void {
    this.quizCategoryService.getCategory().subscribe((resp) => {
      this.categories = resp;
    });
  }

  handleFileInput(files: FileList) {
    this.jsonFile = files.item(0);

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // let aux: string = fileReader.result.toString();
      // this.fileContent = JSON.parse(aux);
      this.fileContent = JSON.parse(fileReader.result.toString());
    };
    fileReader.readAsText(this.jsonFile);
  }

  saveLoadedQuiz() {
    let quiz: Quizz = {
      authorId: +localStorage.getItem('userId'),
      title: this.fileContent['title'],
      category: this.fileContent['category'],
      difficulty: this.fileContent['difficulty'],
      creationDate: new Date(),
      elements: this.fileContent['elements'],
    };

    this.quizService.createQuiz(quiz).subscribe((resp) => {
      this.fileContent = null;
      this.jsonFile = null;
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: `Quiz '${quiz.title}' saved`,
        life: 3000,
      });
      setTimeout(() => {
        this.router.navigate(['/content/user-quizz'], {
          relativeTo: this.route,
        });
      }, 1000);
    });
  }

  saveQuiz() {
    if (this.quizForm.valid && this.questions.length > 0) {
      let quiz: Quizz = {
        authorId: +localStorage.getItem('userId'),
        title: this.quizForm.controls['title'].value,
        category: this.quizForm.controls['category'].value,
        difficulty: this.quizForm.controls['difficulty'].value,
        creationDate: new Date(),
        elements: this.questions,
      };

      this.quizService.createQuiz(quiz).subscribe((resp) => {
        this.quizForm.reset();
        this.questions = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Quiz '${quiz.title}' saved`,
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['/content/user-quizz'], {
            relativeTo: this.route,
          });
        }, 1000);
      });
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
