<?php

namespace App\Http\Controllers\API;

use App\Models\Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlotsController extends Controller
{
    public function index(){

        $times = Slot::orderBy('date')->orderBy('time')->get() ;
        return response()->json($times) ;
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        // Check if the slot already exists
        $exists = Slot::where('date', $validated['date'])
                      ->where('time', $validated['time'])
                      ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This time slot already exists.'
            ], 409); // Conflict
        }

        // Create the time slot
        $slot = Slot::create([
            'date' => $validated['date'],
            'time' => $validated['time'],
            'is_booked' => false,
        ]);

        return response()->json([
            'message' => 'Time slot created successfully.',
            'data' => $slot
        ], 201); // Created
    }
}
