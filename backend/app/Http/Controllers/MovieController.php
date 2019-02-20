<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Movie;
use App\User;
use App\Genre;
use App\Image;
use App\Actor;
use App\Director;

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
            'content' => request()->content,
            'rating' => request()->rating,
            'release_year' => (int) request()->year
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
                'movie_id' =>$movie->id,
                'path' => $path
            ]);
        }

        $movie->save();

        $actors = Actor::find(request()->actors);
        $movie->actors()->attach($actors);

        $directors = Director::find(request()->directors);
        $movie->directors()->attach($directors);


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
    }
    
    public function searchUserMovies(Request $request) {

        $query = Movie::query();
        $movies = $query->with('user')
                ->with('genres')
                ->where('name','like', '%'.request()->value.'%')
                //orWhere('rating',request()->rating) ->todo
                ->orderBy('name')
                ->get();
        return $movies;
    }
}
