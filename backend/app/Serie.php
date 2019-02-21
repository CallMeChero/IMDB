<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Genre;
use App\Image;

class Serie extends Model
{
    protected $fillable = [
        'name', 'user_id', 'content', 'rating', 'release_year'
    ];

    protected $with = [
        'image','actors', 'directors'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_serie');
    }

    public function image()
    {
        return $this->hasOne(Image::class);
    }

    public function actors()
    {
        return $this->morphToMany(Actor::class, 'actorable');
    }

    public function directors()
    {
        return $this->morphToMany(Director::class, 'directorable');
    }
}
