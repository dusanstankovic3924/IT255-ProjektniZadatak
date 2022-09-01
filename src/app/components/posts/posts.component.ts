import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  selectedPost: Post = {};

  auth: boolean = false; // for check auth

  isAdmin: boolean = false; // for check admin

  loggedInUser: User = {};

  searchValue: string; // for search [(ngModel)]

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Set logged in user
    if (localStorage.getItem('user') !== null) {
      this.loggedInUser = JSON.parse(localStorage.getItem('user')) as User;
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

    // Load all posts
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.sort((post) => {
        return post.date ? -1 : 1;
      });
    });
  }

  // Check authentication
  isLoggedIn(): boolean {
    if (localStorage.getItem('user') !== null) {
      this.auth = true;

      const user: User = JSON.parse(localStorage.getItem('user')) as User;

      this.isAdmin = user.admin;

      return true;
    }

    this.auth = false;

    return false;
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
