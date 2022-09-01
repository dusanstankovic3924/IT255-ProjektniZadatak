import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postURL: string = 'http://localhost:5000/posts';

  // For select
  private postSource = new BehaviorSubject<Post>({
    id: null,
    userId: null,
    title: null,
    body: null,
    date: null,
  });
  selectedPost = this.postSource.asObservable();

  // For clear
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postURL);
  }

  getPostsByUserId(userId: number) {
    const newUrl = `${this.postURL}?userId=${userId}`;
    return this.http.get<Post[]>(newUrl);
  }

  getPostsById(id: number) {
    const newUrl = `${this.postURL}/${id}`;
    return this.http.get<Post>(newUrl);
  }

  addPost(post: Post) {
    return this.http.post<Post>(this.postURL, post, httpOptions);
  }

  deletePost(id: number) {
    const newUrl = `${this.postURL}/${id}`;
    return this.http.delete<Post>(newUrl, httpOptions);
  }

  updatePost(post: Post) {
    const newUrl = `${this.postURL}/${post.id}`;
    return this.http.put<Post>(newUrl, post, httpOptions);
  }

  setFormData(post: Post) {
    this.postSource.next(post);
  }

  clearState() {
    this.stateSource.next(true);
  }

  reset() {
    this.postSource = new BehaviorSubject<Post>({
      id: null,
      userId: null,
      title: null,
      body: null,
      date: null,
    });
    this.selectedPost = this.postSource.asObservable();

    this.stateSource = new BehaviorSubject<boolean>(true);
    this.stateClear = this.stateSource.asObservable();
  }
}
