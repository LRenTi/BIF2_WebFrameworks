import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { response } from 'express';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(email: string, password: string) {
    this.http.post<{ Token: string }>('http://localhost:3000/login', { "email": email, "password": password }, this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData);
        localStorage.setItem('authToken', responseData.Token);
        console.log(responseData.Token);
        this.router.navigate(['/landing']);
      });
  }

  signup(email: string, password: string) {
    this.http.post<{ message: string, Token?: string }>('http://localhost:3000/signup', { "email": email, "password": password }, this.httpOptions)
      .subscribe((responseData) => {
        if (responseData.Token) {
          console.log("Signup successful!");
        }
      });
  }

  logout() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const options = {
        headers: new HttpHeaders({ 'Authorization': token })
      };
      this.http.post('http://localhost:3000/logout', {}, options).subscribe(() => {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
        console.log('Logged out!');
      });
    }
    else {
      console.log('No token found!');
    }
  }

  addHighscore(score: number) {
    const token = localStorage.getItem('authToken');
    if (token) {
      const options = {
        headers: new HttpHeaders({ 'Authorization': token })
      };
      this.http.post('http://localhost:3000/highscores', { "score": score }, options)
        .subscribe((responseData) => {
          console.log(responseData);
        });
    }
    else {
      console.log('No token found!');
    }
  }

  getHighscores(): Observable<{username: string, score: number}[]> {
    const token = localStorage.getItem('authToken');
    if (token) {
      const options = {
        headers: new HttpHeaders({ 'Authorization': token })
      };
      return this.http.get<{username: string, score: number}[]>('http://localhost:3000/highscores', options);
    } else {
      console.log('No token found!');
      // Rückgabe eines leeren Observables, damit der Rückgabewert immer ein Observable ist
      return of([]);
    }
  }
  
  
}
