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
}
