import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  name: string = '';
  gameId!: string;



  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.newGame();
    this.route.params.subscribe((params: any) => {
      this.gameId = params.id;
      this.firestore
        .collection('games')
        .doc(params.id)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;

          console.log(game);
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {

    if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      console.log(this.game.playedCards);

      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();


      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);

        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);

    }
    console.log(this.game.pickCardAnimation);
    console.log(this.game.currentCard);



  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    console.log('game', this.game.toJson());

    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());

  }


}

