<?php
Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('signup', 'AuthController@signup');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('resetPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('changePassword', 'ChangePasswordController@process');

    //genres
    Route::get('genres', 'GenreController@index');

    // movies
    Route::get('movies/{username}', 'MovieController@showUserMovies');
    Route::post('movies', 'MovieController@addUserMovie');
    Route::post('delete_movie', 'MovieController@deleteUserMovie');
    Route::put('edit_movie', 'MovieController@editUserMovie');
    Route::get('search_movie', 'MovieController@searchUserMovies');  //krivi nacin al ...

    //series 
    Route::get('series/{username}', 'SerieController@showUserSeries');
    Route::post('series', 'SerieController@addUserSerie');
    Route::put('edit_serie', 'SerieController@editUserSerie');
    Route::post('delete_serie', 'SerieController@deleteUserSerie');
});
