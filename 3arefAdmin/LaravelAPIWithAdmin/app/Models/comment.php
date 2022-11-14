<?php

namespace App\Models;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    use HasFactory;
    protected $fillable = ['CommentText', 'CommentFlag', 'CommentPersonId', 'PersonId'];
    public function CommentClient()
    {
        return $this->belongsTo(Client::class);
    }
}
