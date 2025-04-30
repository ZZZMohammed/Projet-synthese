<?php

namespace App\Models;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Time_Slot extends Model
{
    use HasFactory;

    

    // Define the fillable fields to protect against mass assignment vulnerabilities
    protected $fillable = ['date', 'time', 'is_booked'];

    public function appointments()
    {
        // One time slot can have many appointments
        return $this->hasMany(Appointment::class);
    }
}
