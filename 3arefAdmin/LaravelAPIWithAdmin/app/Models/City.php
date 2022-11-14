<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = ['GovernoratesCity', 'GovernoratesId'];
    public function CityGovernorate()
    {
        return $this->belongsTo(Governorate::class);
    }
}
