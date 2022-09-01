import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-my',
  templateUrl: './posts-my.component.html',
})
export class PostsMyComponent implements OnInit {
  user: User = {};

  posts: Post[] = [];

  selectedPost: Post = {};

  searchValue: string; // for search [(ngModel)]

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
    }

    // Subscribe on clear
    this.postService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedPost = {
          id: null,
          userId: null,
          title: null,
          body: null,
          date: null,
        };
      }
    });

    if (localStorage.getItem('user') !== null) {
      // Set logged in user
      this.user = JSON.parse(localStorage.getItem('user')) as User;

      // Load logged in user's posts
      this.postService.getPostsByUserId(this.user.id).subscribe((posts) => {
        this.posts = posts.sort((post) => {
          return post.date ? -1 : 1;
        });
      });
    }
  }

  // Add
  onAddPost(post: Post) {
    this.postService.addPost(post).subscribe((post) => {
      // Add to local array
      this.posts.unshift(post);
    });
  }

  // Update post
  onUpdatePost(post: Post) {
    this.postService.updatePost(post).subscribe((post) => {
      // Update in local array
      this.posts.forEach((current, index) => {
        if (post.id === current.id) {
          this.posts[index] = post;
        }
      });
    });
  }

  // Delete
  onDeletePost(id: number) {
    if (window.confirm('Do you really want to delete this?')) {
      this.postService.deletePost(id).subscribe(() => {
        // Delete from local array
        this.posts.forEach((current, i) => {
          if (id === current.id) {
            this.posts.splice(i, 1);
          }
        });
      });
    }
  }

  // Select post
  onSelect(post: Post) {
    document.querySelector('#collapseOne').classList.add('show');

    this.postService.setFormData(post);
    this.selectedPost = post;
  }
}
