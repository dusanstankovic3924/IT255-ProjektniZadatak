import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnInit {
  postForm = this.formBuilder.group({
    id: '',
    userId: '',
    title: '',
    body: '',
    date: '',
  });

  new: boolean = true;

  @Output() addEvent: EventEmitter<Post> = new EventEmitter();
  @Output() updateEvent: EventEmitter<Post> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Subscribe to the selected post observable
    this.postService.selectedPost.subscribe((post) => {
      if (post.id !== null) {
        this.new = false;
        this.postForm.controls['id'].setValue(post.id);
        this.postForm.controls['userId'].setValue(post.userId);
        this.postForm.controls['title'].setValue(post.title);
        this.postForm.controls['body'].setValue(post.body);
        this.postForm.controls['date'].setValue(post.date);
      }
    });
  }

  onSubmit() {
    if (this.new) {
      // Add new post
      const { id: userId } = JSON.parse(localStorage.getItem('user')) as User;

      const { title, body } = this.postForm.value;

      const post: Post = {
        userId,
        title,
        body,
        date: new Date(),
      };

      // Send
      this.addEvent.emit(post);
    } else {
      // Update post
      // const { id: userId } = JSON.parse(localStorage.getItem('user')) as User;

      const { id, userId, title, body, date } = this.postForm.value;

      const post: Post = {
        id,
        userId,
        title,
        body,
        date,
      };

      // Send
      this.updateEvent.emit(post);
    }

    // Reset
    this.clearState();

    // Clear data from selection
    this.postService.reset();
  }

  clearState() {
    this.new = true;

    this.postForm.controls['id'].setValue('');
    this.postForm.controls['userId'].setValue('');
    this.postForm.controls['title'].setValue('');
    this.postForm.controls['body'].setValue('');
    this.postForm.controls['date'].setValue('');

    this.postService.clearState();
  }
}
