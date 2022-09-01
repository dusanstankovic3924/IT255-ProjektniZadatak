import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  user: User = {};

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')) as User;
      return true;
    }
    return false;
  }

  onLogout() {
    if (localStorage.getItem('user') !== null) {
      localStorage.removeItem('user');

      this.user = {};

      // Clear data from selection
      this.postService.reset();

      this.router.navigate(['/login']);
    }
  }
}
