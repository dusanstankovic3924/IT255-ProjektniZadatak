import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  getUser(username: string, password: string) {
    const newUrl = `${this.userURL}?username=${username}&password=${password}`;

    return this.http.get<User[]>(newUrl);
  }

  getUserById(id: number) {
    const newUrl = `${this.userURL}/${id}`;

    return this.http.get<User>(newUrl);
  }

  addUser(user: User) {
    return this.http.post<User>(this.userURL, user, httpOptions);
  }
}
