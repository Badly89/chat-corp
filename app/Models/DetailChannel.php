<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailChannel extends Model
{
protected $attributes = [
        'image' => null,
    ];

    protected $fillable = [
        'name', 'desc','visible'
    ];

    public function channel() {
        return $this->belongsTo(Channel::class);

    }
}