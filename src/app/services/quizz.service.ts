import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quizz } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  endPointURL = 'http://localhost:3000/quiz';

  constructor(private http: HttpClient) {}

  createQuiz(quiz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(this.endPointURL, quiz);
  }

  getQuizByUserId(usr: number): Observable<Quizz[]> {
    let data = {
      authorId: '' + usr,
    };
    const params = new HttpParams({ fromObject: data });
    return this.http.get<Quizz[]>(`${this.endPointURL}`, { params });
  }
}
