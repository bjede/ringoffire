import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['female.png', 'frank.png', 'pinguin.png', 'monkey.png', 'profile.png', 'Tiger.png', 'winkboy.png', 'Woman.png'];

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
