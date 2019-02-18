import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-serie',
  templateUrl: './delete-serie.component.html',
  styleUrls: ['./delete-serie.component.css']
})
export class DeleteSerieComponent implements OnInit {

  public serie;

  constructor(
    public dialogRef: MatDialogRef<DeleteSerieComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
  {}

  ngOnInit() {
    this.serie = this.data.serie
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(dialogResponse) {
    this.dialogRef.close(dialogResponse);
  }

}
