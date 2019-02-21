<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\User;
use App\Genre;
use App\Image;
use App\Serie;
use App\Actor;
use App\Director;

class SerieController extends Controller
{
    public function showUserSeries($username) {
        
        $user = User::where('username', $username)->first();
        $series = Serie::with('genres')->with('actors')->where('user_id', $user->id)->get();
        
        return $series;
    }

    public function addUserSerie(Request $request) {

        $user = User::where('username',request()->username)->first();
        $serie = Serie::create([
            'name' => request()->name,
            'user_id' => $user->id,
            'content' => request()->content,
            'rating' => request()->rating,
            'release_year' => request()->year
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

        $actors = Actor::find(request()->actors);
        $serie->actors()->attach($actors);

        $genres = Genre::find(request()->genres);
        $serie->genres()->attach($genres);

        $directors = Director::find(request()->directors);
        $serie->directors()->attach($directors);


        return $serie;
    }

    public function editUserSerie(Request $request) {
        $serie = Serie::find(request()->id);
        if((request()->rating != $serie->rating) && request()->rating != 0)
        {
            $rating = (int) request()->rating['rating'];
        } else {
            $rating = $serie->rating;
        }
        $serie->update([
                    'name' => request()->name,
                    'content' => request()->content,
                    'genres' => request()->genres,
                    'rating' => $rating,
                    'release_year' => request()->year
                    ]);
        $serie->save();

        if(request()->genres) {
            foreach(request()->genres as $i => $genre) {
                $serie_genre[] = $genre['id'];
            }
            $genres = Genre::find($serie_genre);
            $serie->genres()->sync($genres);
        } 
        if(request()->actors) {
            foreach(request()->actors as $i => $actor) {
                $serie_actors[] = $actor['id'];
            }
            $actors = Actor::find($serie_actors);
            $serie->actors()->sync($actors);
        } 
        if(request()->directors) {
            
            $directors = Director::find(request()->directors);
            $serie->directors()->detach();
            $serie->directors()->attach($directors);
        }
        
        return $serie;
    }

    public function deleteUserSerie() {
        $serie = Serie::find(request()->id)->delete();
        if($serie) {
            return response()->json([
                'data' => 'Serie has been successfully deleted!'
            ]);
        }
    }

    public function searchUserSerie(Request $request) {

        $query = Serie::query();
        $series = $query->with('user')
                ->with('genres')
                ->where('name','like', '%'.request()->value.'%')
                //orWhere('rating',request()->rating) ->todo
                ->orderBy('name')
                ->get();
        return $series;
    }
}
