<?php

namespace App\Models;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'is_booked',
    ];

    // One slot has one appointment (if booked)
    public function appointment()
    {
        return $this->hasOne(Appointment::class);
    }
}
