<?php

namespace App\Http\Controllers\API;

use App\Models\Time_Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlotsController extends Controller 
{
    
    public function index(Request $request)
    {
        $query = Time_Slot::query();

        // Filter by date if provided
        if ($request->has('date')) {
            $query->where('date', $request->query('date'));
        }

        $timeSlots = $query->orderBy('date')->orderBy('time')->get();

        return response()->json($timeSlots);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        $exists = Time_Slot::where('date', $validated['date'])
                      ->where('time', $validated['time'])
                      ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This time slot already exists.'
            ], 409);
        }

        $timeSlot = Time_Slot::create([
            'date' => $validated['date'],
            'time' => $validated['time'],
            'is_booked' => false,
        ]);

        return response()->json([
            'message' => 'Time slot created successfully.',
            'data' => $timeSlot
        ], 201);
    }

    // ✅ GET /api/slots/{id}
    public function show($id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        return response()->json($timeSlot);
    }

    // ✅ PUT /api/slots/{id}
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

    // ✅ DELETE /api/slots/{id}
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
