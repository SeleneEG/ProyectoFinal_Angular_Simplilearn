import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Quizz } from 'src/app/models/quiz';
import { Review } from 'src/app/models/review';
import { QuizzService } from 'src/app/services/quizz.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.css'],
})
export class DisplayReviewComponent implements OnInit {
  quizId: number;
  quiz: Quizz;
  reviews: Review[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizzService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params['id'];
      this.reviewService.getQuizReviews(this.quizId).subscribe((reviews) => {
        this.reviews = reviews;
      });
    });
  }
}
