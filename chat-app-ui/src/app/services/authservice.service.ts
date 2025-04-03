import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from '../shared/constants/constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post(AUTH_URL, { username, password });
    }
}