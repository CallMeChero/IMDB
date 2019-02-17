import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {DemoMaterialModule} from './material-module';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//ng-select
import { NgSelectModule } from '@ng-select/ng-select';

//my components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { MoviesComponent } from './components/movies/movies.component';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    MoviesComponent,
    DeleteMovieComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    NgSelectModule,
    MatSelectModule,
    StarRatingModule.forRoot()
  ],
  exports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    DemoMaterialModule,
    MoviesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    TokenService,
    BeforeLoginService,
    AfterLoginService
  ],
  entryComponents: [
    MoviesComponent,
    DeleteMovieComponent,
    EditMovieComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
