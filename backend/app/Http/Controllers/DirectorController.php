<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Director;

class DirectorController extends Controller
{
    public function showdirectors() {
        $directors = Director::all();
        return $directors;
    }
}
