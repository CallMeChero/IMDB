<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Movie extends Model
{
    protected $fillable = [
        'name', 'user_id', 'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
