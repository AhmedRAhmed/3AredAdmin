<?php

namespace App\Models;

use App\Models\comment;
use App\Models\alert;
use App\Models\document;
use App\Models\tag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'FullName',
        'Phone',
        'Password',
        'Bio',
        'WorkingDays',
        'NoteWork',
        'ProfilePhoto',
        'Rating1',
        'Rating2',
        'Rating3',
        'Rating4',
        'Rating5',
        'Valid',
        'Verified',
        'CountOfComments',
        'CountOfViewers',
        'CountOfPhone',
        'Location',
        'Governorate',
        'City',
        'Job',
        'JobTitle',
        'JobType'
    ];
    public function ClientComment()
    {
        return $this->hasMany(comment::class);
    }
    public function ClientTags()
    {
        return $this->hasMany(tag::class);
    }
    public function ClientAlerts()
    {
        return $this->hasMany(alert::class);
    }
    public function ClientDocuments()
    {
        return $this->hasMany(document::class);
    }
}
