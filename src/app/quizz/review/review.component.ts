import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor() {}

  reviewForm = new FormGroup({
    raiting: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  sendReview() {
    if (this.reviewForm.valid) {
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }
}
