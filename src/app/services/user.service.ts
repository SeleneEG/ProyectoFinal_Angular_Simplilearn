import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endPointURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.endPointURL}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.endPointURL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.endPointURL}/${user.id}`, user);
  }

  getUserPorUsername(usr: string): Observable<User> {
    let data = {
      username: usr,
    };
    const params = new HttpParams({ fromObject: data });
    return this.http.get<User>(`${this.endPointURL}`, { params });
  }

  login(usr: string, pwd: string): Observable<User> {
    let data = {
      username: usr,
      password: pwd,
    };

    const params = new HttpParams({ fromObject: data });
    return this.http.get<User>(`${this.endPointURL}`, { params });
  }
}
