<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobTitle extends Model
{
    use HasFactory;
    protected $fillable = ['JobTitle', 'JobId'];
    public function JobTitleJob()
    {
        return $this->belongsTo(Jobs::class);
    }
}
