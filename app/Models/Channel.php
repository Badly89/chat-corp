<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $attributes = [
        'title' => null,
    ];

    protected $fillable = [
        'title',
        'description',
        'image',
        'visible',
        'type',
        'user_id_creator'

    ];

    protected $hidden = ['pivot'];

    public function users() {
        return $this->belongsToMany('App\Models\User', 'rosters')->withTimestamps()->select('name','user_id');
    }

}