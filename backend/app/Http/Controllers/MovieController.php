<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Movie;
use App\User;

class MovieController extends Controller
{
    public function showUserMovies($username) {
        
        $user = User::where('username', $username)->first();
        $movies = $user->movies;

        return $movies;
    }

    public function addUserMovie(Request $request) {
        $user = User::where('username',request()->username)->first();
        $movie = Movie::create([
            'name' => request()->name,
            'user_id' => $user->id,
            'content' => request()->content
        ]);

        return $movie;
    }

    public function deleteUserMovie(Request $request) {
        $movie = Movie::find(request()->id)->delete();

        return response()->json([
            'data' => 'Movie has been successfully deleted!'
        ]);
    }
}
