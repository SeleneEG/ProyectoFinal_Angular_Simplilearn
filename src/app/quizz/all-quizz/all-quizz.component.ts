import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Quizz } from 'src/app/models/quiz';
import { QuizzService } from 'src/app/services/quizz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-quizz',
  templateUrl: './all-quizz.component.html',
  styleUrls: ['./all-quizz.component.css'],
})
export class AllQuizzComponent implements OnInit {
  quizzesAux: Quizz[] = [];
  quizzes: Quizz[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private quizService: QuizzService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.quizService
      .getQuizFromOtherUsers(+localStorage.getItem('userId'))
      .subscribe((resp) => {
        this.quizzesAux = resp;
        this.quizzesAux.forEach((quizz) => {
          this.userService.getUserPorId(quizz.authorId).subscribe((author) => {
            this.quizzes.push({ ...quizz, authorName: author.username });
          });
        });
      });
  }

  takeQuiz(quiz) {
    this.router.navigate(['../take-quizz', quiz.id], {
      relativeTo: this.route,
    });
  }
}
