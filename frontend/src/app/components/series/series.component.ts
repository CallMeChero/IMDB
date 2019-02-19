import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent
} from 'angular-star-rating';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  public nameFormGroup;
  public contentFormGroup;
  public genreFormGroup;
  public tokenData;
  public genres;
  public file;
  private imageSrc: string = '';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  isOpened: boolean = false;

  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private token: TokenService,
    public dialogRef: MatDialogRef<SeriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.nameFormGroup = this.fb.group({
      name: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern('([a-zA-Z]\s|.){3,25}')
      ])]
    });
    this.contentFormGroup = this.fb.group({
      content: [
        '', 
        Validators.required
      ],
      serieRating: [
        3,
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
  }

  onPictureUpload(picture) {
    this.file = picture.target.files[0]
  }

  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user;
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
  }

  onSubmit() {
     this.auth.sumbmitSerie({
      "name" : this.nameFormGroup.value.name,
      "content": this.contentFormGroup.value.content,
      "username": this.getLoggedUser(),
      "genres": this.genreFormGroup.value.selectedGenre,
      "base64": this.imageSrc,
      "rating": this.contentFormGroup.value.serieRating
        }).subscribe(
           data => this.handleResponse(),
           error => console.log(error)
       );
   }

  handleResponse() {
    this.dialogRef.close();
  }

  OpenDiv() {
     this.isOpened = true;
  }

  CloseDiv() {
     this.isOpened = false;
  }

  onClick = ($event: ClickEvent) => {
    this.contentFormGroup.value.serieRating = $event;
    console.log(this.contentFormGroup.value.serieRating);
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    this.contentFormGroup.value.serieRating = $event;
    console.log(this.contentFormGroup.value.serieRating);
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
  };
}
