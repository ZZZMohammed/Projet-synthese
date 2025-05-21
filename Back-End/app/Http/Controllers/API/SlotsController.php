<?php

namespace App\Http\Controllers\API;

use App\Models\Time_Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class SlotsController extends Controller 
{
    // Define the fixed time slots (09:00 to 12:00 and 15:00 to 18:00)
    private $fixedTimeSlots = [
        '09:00:00',
        '10:00:00', 
        '11:00:00',
        '12:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00'
    ];
    
    /**
     * Get time slots within a date range
     */
    public function index(Request $request) 
    {
        $request->validate([
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Time_Slot::query()
            ->orderBy('date')
            ->orderBy('time');

        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        return response()->json($query->get());
    }

    /**
     * Create time slots for a specific date
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
        ]);

        $date = $validated['date'];
        $createdSlots = [];

        foreach ($this->fixedTimeSlots as $time) {
            if (!$this->slotExists($date, $time)) {
                $createdSlots[] = Time_Slot::create([
                    'date' => $date,
                    'time' => $time,
                    'is_booked' => false,
                ]);
            }
        }

        if (empty($createdSlots)) {
            return response()->json([
                'message' => 'All time slots already exist for this date.'
            ], 409);
        }

        return response()->json([
            'message' => count($createdSlots) . ' time slot(s) created successfully.',
            'data' => $createdSlots
        ], 201);
    }

    /**
     * Get available slots for a specific date
     */
    public function getByDate($date)
    {
        if (!Carbon::createFromFormat('Y-m-d', $date)) {
            return response()->json(['message' => 'Invalid date format. Use YYYY-MM-DD.'], 400);
        }

        $slots = Time_Slot::where('date', $date)
                  ->where('is_booked', false)
                  ->orderBy('time')
                  ->get();

        return response()->json($slots);
    }

    /**
     * Get single time slot
     */
    public function show($id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        return response()->json($timeSlot);
    }

    /**
     * Update a time slot
     */
    public function update(Request $request, $id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        $validated = $request->validate([
            'date' => 'sometimes|date',
            'time' => 'sometimes|date_format:H:i:s',
            'is_booked' => 'sometimes|boolean',
        ]);

        // Prevent changing time to one of our fixed slots
        if (isset($validated['time']) && !in_array($validated['time'], $this->fixedTimeSlots)) {
            return response()->json([
                'message' => 'Invalid time. Must be one of the fixed time slots.'
            ], 422);
        }

        $timeSlot->update($validated);

        return response()->json($timeSlot);
    }

    /**
     * Delete a time slot
     */
    public function destroy($id)
    {
        $timeSlot = Time_Slot::find($id);

        if (!$timeSlot) {
            return response()->json(['message' => 'Time slot not found.'], 404);
        }

        // Prevent deletion of booked slots
        if ($timeSlot->is_booked) {
            return response()->json([
                'message' => 'Cannot delete a booked time slot.'
            ], 422);
        }

        $timeSlot->delete();

        return response()->json(['message' => 'Time slot deleted successfully.']);
    }

    /**
     * Check if a slot already exists
     */
    private function slotExists($date, $time)
    {
        return Time_Slot::where('date', $date)
            ->where('time', $time)
            ->exists();
    }
}