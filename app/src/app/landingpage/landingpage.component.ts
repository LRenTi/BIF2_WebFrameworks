import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingPageComponent {

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
      // authToken überprüfen
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.router.navigate(['/login']); // Navigiere zur Login-Seite
    }
  }

  addHighscore() {
  }

  viewHighscores() {
    this.router.navigate(['/highscores']); // Navigiere zur Highscore-Seite
  }

  logout() {
    this.backendService.logout();
    this.router.navigate(['/login']); // Navigiere zur Login-Seite
  }
}
