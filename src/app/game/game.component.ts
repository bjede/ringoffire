import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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



  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.firestore.collection('games')
    .valueChanges().subscribe((game) => {
      console.log(game);
    });
    console.log(this.game.stack);
  }

  newGame() {
    this.game = new Game();
    this.firestore
    .collection('games')
    .add({'Card': this.currentCard});
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
    this.game.currentPlayer++
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    console.log(this.game.currentPlayer);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

  
}

