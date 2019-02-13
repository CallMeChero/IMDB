import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit{

  public movie;

  constructor(
    public dialogRef: MatDialogRef<DeleteMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
  {}

  ngOnInit() {
    this.movie = this.data.movie
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(dialogResponse) {
    this.dialogRef.close(dialogResponse);
  }

}
