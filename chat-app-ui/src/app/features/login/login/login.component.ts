import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

    constructor(private http: HttpClient) {}

    onLogin() {
        const loginPayload = { username: this.username, password: this.password };
        this.http.post('http://localhost:8080/authenticate', loginPayload)
            .subscribe(response => {
                console.log('JWT Token:', response);
                localStorage.setItem('token', response['token']);
            });
    }

}
