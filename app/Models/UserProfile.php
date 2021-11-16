<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
 protected $fillable = ['avatar', 'desc'];


    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
