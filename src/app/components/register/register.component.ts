import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If user is already logged in
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const user: User = this.registerForm.value as User;

    // By default, not admin
    user.admin = false;

    this.userService.addUser(user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/']);
    });
  }
}
