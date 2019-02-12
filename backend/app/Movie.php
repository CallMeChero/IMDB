<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Movie extends Model
{
    protected $fillable = [
        'name', 'user_id',
    ];

    public function post()
    {
        return $this->belongsTo('App\User');
    }
}
