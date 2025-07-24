<?php

namespace App\Models;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Time_Slot extends Model
{
    use HasFactory;

    protected $table = 'time_slots'; 

    protected $fillable = ['date', 'time', 'is_booked'];

    public function appointments()
    {
        
        return $this->hasMany(Appointment::class);
    }
}
