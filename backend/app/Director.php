<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $fillable = [
        'name'
    ];

    public function movies()
    {
        return $this->morphedByMany(Movie::class, 'directorable');
    }
 
    public function series()
    {
        return $this->morphedByMany(Serie::class, 'directorable');
    }
}
