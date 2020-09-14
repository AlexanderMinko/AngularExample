import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  start: boolean = false;
  imgPath: string = 'assets/images/dice-1.jpg';
  player = ['Player 1', 'Player 2'];
  totalScore: number = 0;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = [0, 0];
  gameEnd: boolean = false;
  gameStart: boolean = false;

  onRole() {
    this.gameStart = true;
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    this.imgPath = `assets/images/dice-${randomNumber}.jpg`;
    if(randomNumber !== 1) {
      this.totalScore += randomNumber;
      this.currentScore[this.activePlayer] = this.totalScore;
    } else {
      this.nextPlayer();
    }
  }

  nextPlayer() {
    this.totalScore = 0;
      this.currentScore[this.activePlayer] = this.totalScore;
      this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
  }

  onHold() {
      this.scores[this.activePlayer] += this.totalScore;
      if(this.scores[this.activePlayer] >= 100) {
        this.player[this.activePlayer] = 'WINNER'
        this.gameEnd = true;
      } else {
        this.nextPlayer();
      }
  }

  onNewGame() {
    this.player = ['Player 1', 'Player 2'];
    this.totalScore = 0;
    this.scores = [0, 0];
    this.activePlayer = 0;
    this.currentScore = [0, 0];
    this.gameEnd  = false;
    this.gameStart = false;
  }
}
