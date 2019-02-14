import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  nameFormGroup;
  contentFormGroup;
  genreFormGroup;
  tokenData;
  public genres;
  public error;
  public err;
  actionButtonLabel: string = 'Retry';
  action: boolean = true;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private token: TokenService,
    public dialogRef: MatDialogRef<MoviesComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

   ngOnInit() {
    this.nameFormGroup = this.fb.group({
      name: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9]{3,20}')
      ])]
    });
    this.contentFormGroup = this.fb.group({
      content: [
        '', 
        Validators.required
      ]
    });
    this.genreFormGroup = this.fb.group({
      selectedGenre: [
      ]
    });
    this.getGenres();
   } 

  getGenres() {
    this.auth.getGenres()
    .subscribe(
      data => this.handleGenreResponse(data),
      error => console.log(error)
    );
  }

  handleGenreResponse(data) {
    this.genres = data;
    console.log(this.genres);
  }

  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user;
  }

   onSubmit() {
    this.nameFormGroup.value.content = this.contentFormGroup.value.content;
    console.log(this.genreFormGroup.value.selectedGenre);
     this.auth.sumbmitMovie({
      "name" : this.nameFormGroup.value.name,
      "content": this.contentFormGroup.value.content,
      "username": this.getLoggedUser(),
      "genres": this.genreFormGroup.value.selectedGenre
        }).subscribe(
           data => this.handleResponse(),
           error => console.log(error)
       );
   }

   handleResponse() {
    this.dialogRef.close();
   }

}
