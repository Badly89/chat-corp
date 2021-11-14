<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
     protected $attributes = [
        'name' => null,
    ];

    protected $fillable = [
        'name'
    ];
    protected $hidden = ['pivot'];

   public function users() {
        return $this->belongsToMany('App\Models\User', 'user_channel')->withTimestamps()->select('name','id');
    }

}
