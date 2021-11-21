<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
     protected $attributes = [
        'title' => null,
    ];

    protected $fillable = [
        'title',
        'description',
        'image',
        'visible',
        'type',

    ];
    protected $hidden = ['pivot'];

   public function users() {
        return $this->belongsToMany('App\Models\User', 'rosters')->withTimestamps()->select('title','id');
    }

}