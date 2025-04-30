<?php

namespace App\Http\Controllers\API;

use App\Models\Time_Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlotsController extends Controller 
{
    public function index()
    {
        $times = Time_Slot::orderBy('date')->orderBy('time')->get();
        return response()->json($times);
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        // Check if the Time_Slots already exists
        $exists = Time_Slot::where('date', $validated['date'])
                      ->where('time', $validated['time'])
                      ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This time slot already exists.'
            ], 409); // Conflict
        }

        // Create the time slot
        $timeSlot = Time_Slot::create([
            'date' => $validated['date'],
            'time' => $validated['time'],
            'is_booked' => false,
        ]);

        return response()->json([
            'message' => 'Time slot created successfully.',
            'data' => $timeSlot
        ], 201); // Created
    }

    public function show($id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        return response()->json($timeSlot);
    }

    public function update(Request $request, $id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'is_booked' => 'boolean',
        ]);

        $timeSlot->update($validated);

        return response()->json($timeSlot);
    }

    public function destroy($id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        $timeSlot->delete();

        return response()->json(['message' => 'Time slot deleted successfully.']);
    }
}
