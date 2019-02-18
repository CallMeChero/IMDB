<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\User;
use App\Genre;
use App\Image;
use App\Serie;

class SerieController extends Controller
{
    public function showUserSeries($username) {
        
        $user = User::where('username', $username)->first();
        $series = Serie::with('genres')->where('user_id', $user->id)->get();
        
        return $series;
    }

    public function addUserSerie(Request $request) {

        $user = User::where('username',request()->username)->first();
        $serie = Serie::create([
            'name' => request()->name,
            'user_id' => $user->id,
            'content' => request()->content,
            'rating' => request()->rating
        ]);

        /*handle img*/
        $img = request()->base64;
        if($img) {
            $frontendPath = "C:\\www\\htdocs\\imdb2\\IMDB\\frontend\\src\\assets\\img\\";
            $png_url = "image_laravel".time().".jpg";
            $path = $frontendPath . $png_url;
            $img = substr($img, strpos($img, ",")+1);
            $data = base64_decode($img);
            $success = file_put_contents($path, $data);

            $media = Image::create([
                'filename' => $png_url,
                'serie_id' => $serie->id,
                'path' => $path
            ]);
        }
        $serie->save();
        $genres = Genre::find(request()->genres);
        $serie->genres()->attach($genres);

        return $serie;
    }

    /*public function deleteUserMovie(Request $request) {
        $movie = Movie::find(request()->id)->delete();

        return response()->json([
            'data' => 'Movie has been successfully deleted!'
        ]);
    }

    public function editUserMovie(Request $request) {
        $movie = Movie::find(request()->id);
        $rating = (int) request()->rating['rating'];
        $movie->update([
                    'name' => request()->name,
                    'content' => request()->content,
                    'genres' => request()->genres,
                    'rating' => $rating
                    ]);
        $movie->save();

        if(request()->genres) {
            foreach(request()->genres as $i => $genre) {
                $movie_genres[] = $genre['id'];
            }
            $genres = Genre::find($movie_genres);
            $movie->genres()->sync($genres);
        } else if ($movie->genres()){
            $movie->genres()->detach();
        }
        
        return $movie;
    }*/
}
