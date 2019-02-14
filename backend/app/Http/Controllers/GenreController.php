<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Genre;

class GenreController extends Controller
{
    public function index(Request $request) {
        $genres = Genre::all();
        return $genres;
    }
}
