<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class document extends Model
{
    use HasFactory;
    protected $fillable = ['Document', 'Brief', 'Type', 'PersonId'];

    public function DocumentClient()
    {
        return $this->belongsTo(Client::class);
    }
}
