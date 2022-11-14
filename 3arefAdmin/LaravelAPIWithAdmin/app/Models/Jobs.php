<?php

namespace App\Models;

use App\Models\JobTitle;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;
    protected $fillable = ['JobName', 'JobType'];
    public function JobsJobsTitles()
    {
        return $this->hasMany(JobTitle::class);
    }
}
