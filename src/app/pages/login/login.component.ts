import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { User } from '../../states/room/room.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.roomService.login(loginData).subscribe(
      (res: any) => {
        if (Array.isArray(res)) {
          this.handleLoginResponse(res, loginData);
        } else {
          alert('Invalid response format');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private handleLoginResponse(
    users: User[],
    loginData: { username: string; password: string }
  ) {
    const matchedUser = this.findUserByUsername(users, loginData.username);

    if (matchedUser) {
      this.validatePassword(matchedUser, loginData.password);
    } else {
      this.setError('username');
    }
  }

  private findUserByUsername(
    users: User[],
    username: string
  ): User | undefined {
    return users.find((user: User) => user.userData.username === username);
  }

  private validatePassword(matchedUser: User, password: string): void {
    if (matchedUser.userData.password === password) {
      localStorage.setItem('hotelUser', JSON.stringify(matchedUser.userData));
      this.router.navigateByUrl('/dashboard');
    } else {
      this.setError('password');
    }
  }

  setError(err: string) {
    this.loginForm.get(err)?.setErrors({ invalidCredentials: true });
  }
}
