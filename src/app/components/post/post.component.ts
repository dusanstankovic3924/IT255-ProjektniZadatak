import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  post: Post = {};

  user: User = {};

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get id from URL
    const id: number = +this.route.snapshot.paramMap.get('id');

    // Set up current post by id
    this.postService.getPostsById(id).subscribe((post) => {
      this.post = post;

      // Get post author
      this.getUserById(this.post.userId);
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((user) => (this.user = user));
  }
}
