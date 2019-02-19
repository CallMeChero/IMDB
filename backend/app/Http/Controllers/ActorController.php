<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actor;

class ActorController extends Controller
{
    public function showActors() {
        $actors = Actor::all();
        return $actors;
    }
}
