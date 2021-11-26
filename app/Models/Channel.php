<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $guarded =[];
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
        return $this->belongsToMany(User::class, 'rosters')->withTimestamps()->select('channel_id','user_id');
    }

}