<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Movie;
use App\Serie;

class Genre extends Model
{
    protected $fillable = [
        'name'
    ];

    public function movies()
    {
        return $this->belongsToMany(Movie::class);
    }

    public function series()
    {
        return $this->belongsToMany(Serie::class, 'genre_serie');
    }
}
