<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Movie;

class Image extends Model
{
    protected $fillable = [
        'movie_id','filename','mime', 'original_filename'
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}