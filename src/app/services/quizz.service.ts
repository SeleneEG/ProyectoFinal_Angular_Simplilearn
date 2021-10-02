import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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

  getQuizFromOtherUsers(usr: number): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(`${this.endPointURL}/?authorId_ne=${usr}`);
  }

  getQuiz(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(`${this.endPointURL}`);
  }

  getQuizById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.endPointURL}/${id}`);
  }

  deleteQuiz(id): Observable<Quizz> {
    return this.http.delete<Quizz>(`${this.endPointURL}/${id}`);
  }
}
