<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Movie;
use App\User;
use App\Genre;
use App\Image;

class MovieController extends Controller
{
    public function showUserMovies($username) {
        
        $user = User::where('username', $username)->first();
        $movies = Movie::with('genres')->with('image')->where('user_id', $user->id)->get();
        
        return $movies;
    }

    public function addUserMovie(Request $request) {

        $user = User::where('username',request()->username)->first();
        $movie = Movie::create([
            'name' => request()->name,
            'user_id' => $user->id,
            'content' => request()->content
        ]);

        /*handle img*/
        $frontendPath = "C:\\www\\htdocs\\imdb2\\IMDB\\frontend\\src\\assets\\img\\";
        $img = request()->base64;
        $png_url = "image_laravel".time().".jpg";
        $path = $frontendPath . $png_url;
        $img = substr($img, strpos($img, ",")+1);
        $data = base64_decode($img);
        $success = file_put_contents($path, $data);

        $media = Image::create([
            'filename' => $png_url,
            'movie_id' =>$movie->id,
            'path' => $path
        ]);

        $movie->save();
        $genres = Genre::find(request()->genres);
        $movie->genres()->attach($genres);

        return $movie;
    }

    public function deleteUserMovie(Request $request) {
        $movie = Movie::find(request()->id)->delete();

        return response()->json([
            'data' => 'Movie has been successfully deleted!'
        ]);
    }

    public function editUserMovie(Request $request) {
        $movie = Movie::find(request()->id)
            ->update([
                'name' => request()->name,
                'content' => request()->content
                ]);
        $movie = Movie::find(request()->id);
        return $movie;
    }
}
