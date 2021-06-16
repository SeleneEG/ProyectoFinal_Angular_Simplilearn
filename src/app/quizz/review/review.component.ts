import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  idQuiz: number;
  disabledSendReview: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private messageService: MessageService
  ) {}

  reviewForm = new FormGroup({
    rating: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idQuiz = params['id'];
    });
  }

  sendReview() {
    if (this.reviewForm.valid) {
      this.disabledSendReview = true;
      let review: Review = {
        idQuiz: this.idQuiz,
        date: new Date().toString(),
        review: this.reviewForm.controls['review'].value,
        rating: this.reviewForm.controls['rating'].value,
        userId: +localStorage.getItem('userId'),
      };
      this.reviewService.createReview(review).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Review saved`,
          life: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['/content/all-quizz'], {
            relativeTo: this.route,
          });
        }, 3000);
      });
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }
}
