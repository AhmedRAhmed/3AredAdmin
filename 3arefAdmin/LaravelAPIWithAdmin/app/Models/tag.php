<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tag extends Model
{
    use HasFactory;
    protected $fillable = ['TagName', 'PersonId'];
    public function TagClient()
    {
        return $this->belongsTo(Client::class);
    }
}
