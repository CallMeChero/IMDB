<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Movie;

class Image extends Model
{
    protected $fillable = [
        'serie_id','movie_id','filename','path'
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function serie()
    {
        return $this->belongsTo(Serie::class);
    }
}
