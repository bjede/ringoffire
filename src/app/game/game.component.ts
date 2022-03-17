import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerMessageComponent } from '../dialog-add-player-message/dialog-add-player-message.component';
import { GameOverComponent } from '../game-over/game-over.component';

export interface DialogData {
  name: string;
  selectedValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  name: string = '';
  selectedValue: string = '';
  gameId!: string;
  gameOver: boolean = false;


  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
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
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    this.showTakePlayerMessage();
    this.showGameOverMessage();
    if (this.isGameOver()) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.players.length > 0 && !this.gameOver) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);
    }
  }

  isGameOver() {
    return this.game.stack.length == 0;
  }

  showGameOverMessage() {
    if (this.isGameOver()) {
      const dialogRef = this.dialog.open(GameOverComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.gameOver = false;
          this.newGame();
          this.saveGame();
        }
      });
    }
  }

  showTakePlayerMessage() {
    if (this.game.players.length == 0) {
      this.dialog.open(DialogAddPlayerMessageComponent);
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: any) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name, selectedValue: this.selectedValue }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.game.players.push(data.name);
        this.game.player_images.push(data.selectedValue);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }
}

