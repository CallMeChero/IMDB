<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    protected $fillable = [
        'name'
    ];

    public function movies()
    {
        return $this->morphedByMany(Movie::class, 'actorable');
    }
 
    public function series()
    {
        return $this->morphedByMany(Serie::class, 'actorable');
    }
}
