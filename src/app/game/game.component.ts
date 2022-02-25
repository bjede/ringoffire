import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation: boolean = false;
  game: Game = new Game();
  currentCard: any;
  name: string = '';



  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

    console.log(this.game.stack);
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.game.playedCards);


      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
    });
  }

}

