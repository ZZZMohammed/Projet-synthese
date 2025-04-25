<?php

namespace App\Models;

use App\Models\Slot;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
       'user_id',
        'time_slot_id',
        'status',
    ];
    


    public function user()
{
    return $this->belongsTo(User::class);
}

public function timeSlot()
{
    return $this->belongsTo(Slot::class);
}

}
