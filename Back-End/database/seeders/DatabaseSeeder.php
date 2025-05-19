<?php

namespace Database\Seeders;

use App\Models\Time_Slot;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Appointment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(5)->create();
        Time_Slot::factory(10)->create();
    
        // Get random patients and slots
        $patients = User::where('role', 'patient')->get();
        $slots = Time_Slot::all();
    
        foreach ($patients as $patient) {
            $slot = $slots->random();
            $slot->is_booked = true;
            $slot->save();
    
            Appointment::factory()->create([
                'user_id' => $patient->id,
                'time_slot_id' => $slot->id,
                'status' => 'pending',
            ]);
        }
    }
}
