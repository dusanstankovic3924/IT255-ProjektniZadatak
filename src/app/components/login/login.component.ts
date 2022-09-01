import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
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
    const { username, password } = this.loginForm.value;

    this.userService.getUser(username, password).subscribe((users) => {
      if (users.length > 0) {
        const user = users[0];

        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/']);
      } else {
        alert('Wrong login data');
      }
    });
  }
}
