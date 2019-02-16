import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  public movie;
  public error;
  public tokenData;
  public genres;

  edit_movie_validation_messages = {
    'name': [
      { type: 'required', message: 'Movie name is required' },
      { type: 'pattern', message: 'Movie name must be between 3 and 20 characters' }
    ],
    'content': [
      { type: 'required', message: 'Movie content is required' }
    ]
    }

    editMovie = this.fb.group({
      id: [this.data.movie.id],
      name:[
          this.data.movie.name,
          Validators.compose([
            Validators.required,
            Validators.pattern('[A-Za-z0-9]{3,20}')
          ])
        ],
      content: [
        this.data.movie.content,
        Validators.compose([
          Validators.required
        ])
      ]
  });
  genreFormGroup = this.fb.group({
    selectedGenre: [this.data.movie.genres]
  });

  constructor(
    public dialogRef: MatDialogRef<EditMovieComponent>,
    private fb: FormBuilder,
    private auth:AuthService,
    private token: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user;
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
  }

  ngOnInit() {
    this.getGenres();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

   onSubmit() {
     this.auth.editMovie({
      "id" : this.editMovie.value.id,
      "name" : this.editMovie.value.name,
      "content": this.editMovie.value.content,
      "genres": this.genreFormGroup.value.selectedGenre
        }).subscribe(
           data => this.handleResponse(data),
           error => console.log(error)
       );
   }

   handleResponse(data) {
    this.dialogRef.close(data);
   }

}
