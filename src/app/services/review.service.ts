import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  endPointURL = 'http://localhost:3000/review';

  constructor(private http: HttpClient) {}

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.endPointURL, review);
  }

  getQuizReviews(idQuiz: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.endPointURL}?idQuiz=${idQuiz}`);
  }
}
