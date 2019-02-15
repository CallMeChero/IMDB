<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Genre;
use App\Image;

class Movie extends Model
{
    protected $fillable = [
        'name', 'user_id', 'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function image()
    {
        return $this->hasOne(Image::class);
    }
}
