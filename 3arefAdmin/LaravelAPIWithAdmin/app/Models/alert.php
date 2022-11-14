<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class alert extends Model
{
    use HasFactory;
    protected $fillable = ['alert', 'alertType', 'PersonId'];
    public function AlertClient()
    {
        return $this->belongsTo(Client::class);
    }
}
