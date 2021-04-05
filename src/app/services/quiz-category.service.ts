import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizCategory } from '../models/quiz-category';

@Injectable({
  providedIn: 'root',
})
export class QuizCategoryService {
  endPointURL = 'http://localhost:3000/quiz_category';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<QuizCategory[]> {
    return this.http.get<QuizCategory[]>(`${this.endPointURL}`);
  }

  getCategoryById(id: number): Observable<QuizCategory> {
    return this.http.get<QuizCategory>(`${this.endPointURL}/${id}`);
  }
}
