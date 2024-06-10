import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})

export class HighscoresComponent {

  highscores: { username: string, score: number }[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    // Highscores beim Initialisieren der Komponente abrufen
    this.backendService.getHighscores().subscribe((highscores) => {
      this.highscores = highscores;
    }
    );
  }
}