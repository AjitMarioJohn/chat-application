import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '../../../shared/logger/logger.service';
import { AUTH_URL } from '../../../shared/constants/constant';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
    password!: string;

    constructor(private http: HttpClient, private logger: LoggerService) {}

    onLogin() {
        const loginPayload = { username: this.username, password: this.password };
        this.http.post(AUTH_URL, loginPayload)
            .subscribe(response => {
                this.logger.log('JWT Token:', response);
                localStorage.setItem('token', response['token']);
            });
    }

}
