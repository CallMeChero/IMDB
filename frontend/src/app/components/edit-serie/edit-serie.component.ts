import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent
} from 'angular-star-rating';

@Component({
  selector: 'app-edit-serie',
  templateUrl: './edit-serie.component.html',
  styleUrls: ['./edit-serie.component.css']
})
export class EditSerieComponent implements OnInit {

  
  public serie;
  public error;
  public tokenData;
  public genres;
  public actors;
  public directors;

  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;

  edit_serie_validation_messages = {
    'name': [
      { type: 'required', message: 'Movie name is required' },
      { type: 'pattern', message: 'Movie name must be between 3 and 20 characters' }
    ],
    'content': [
      { type: 'required', message: 'Movie content is required' }
    ]
    }

    editSerie = this.fb.group({
      id: [this.data.serie.id],
      name:[
          this.data.serie.name,
          Validators.compose([
            Validators.required,
            Validators.pattern('([a-zA-Z]\s|.){3,25}')
          ])
        ],
      content: [
        this.data.serie.content,
        Validators.compose([
          Validators.required
        ])
      ],
      year: [
        this.data.serie.release_year
      ]
  });
  genreFormGroup = this.fb.group({
    selectedGenre: [this.data.serie.genres],
    rating: [
      this.data.serie.rating
    ],
    selectedActor: [ this.data.serie.actors ],
    selectedDirector: [ this.data.serie.directors[0] ]
  });

  constructor(
    public dialogRef: MatDialogRef<EditSerieComponent>,
    private fb: FormBuilder,
    private auth:AuthService,
    private token: TokenService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.getGenres();
    this.getActors();
    this.getDirectors();
    this.getLoggedUser()
  }

  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user;
  }

  /* genres */
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

  /* actors */
  getActors() {
    this.auth.getActors()
    .subscribe(
      data => this.handleActorsResponse(data),
      error => console.log(error)
    );
  }

  handleActorsResponse(data) {
    console.log(data)
    this.actors = data;
  }

  /* directors */
  getDirectors() {
    this.auth.getDirectors()
    .subscribe(
      data => this.handleDirectorsResponse(data),
      error => console.log(error)
    );
  }

  handleDirectorsResponse(data) {
    console.log(data)
    this.directors = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
     this.auth.editSerie({
      "id" : this.editSerie.value.id,
      "name" : this.editSerie.value.name,
      "content": this.editSerie.value.content,
      "year": this.editSerie.value.year,
      "rating": this.genreFormGroup.value.rating,
      "genres": this.genreFormGroup.value.selectedGenre,
      "actors": this.genreFormGroup.value.selectedActor,
      "directors": this.genreFormGroup.value.selectedDirector
        }).subscribe(
           data => this.handleResponse(data),
           error => console.log(error)
       );
   }

   handleResponse(data) {
    this.dialogRef.close(data);
   }

   onClick = ($event: ClickEvent) => {
    console.log($event);
    this.genreFormGroup.value.rating = $event;
    console.log(this.genreFormGroup.value.rating);
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    console.log($event);
    this.genreFormGroup.value.rating = $event;
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    console.log($event);
    this.genreFormGroup.value.rating = $event;
  };

}
