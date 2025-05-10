<?php

namespace App\Http\Controllers\API;

use App\Models\Appointment;
use App\Models\Time_Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    // List all appointments
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $appointments = Appointment::with(['user', 'timeSlot'])->orderByDesc('created_at')->get();
        } else {
            $appointments = Appointment::with('timeSlot')
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')
                ->get();
        }

        return response()->json($appointments);
    }

    // Create new appointment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'time_slot_id' => 'required|exists:time_slots,id',
        ]);

        $timeSlot = Time_Slot::findOrFail($validated['time_slot_id']);

        if ($timeSlot->is_booked) {
            return response()->json(['message' => 'This time slot is already booked.'], 409);
        }

        // Create appointment
        $appointment = Appointment::create([
            'user_id' => Auth::id(),
            'time_slot_id' => $timeSlot->id,
            'status' => 'pending',
        ]);

        // Mark time slot as booked
        $timeSlot->is_booked = true;
        $timeSlot->save();

        // Notify all admins
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NewAppointmentNotification($appointment));
        }

        return response()->json([
            'message' => 'Appointment booked successfully.', 
            'data' => $appointment->load('user', 'timeSlot')
        ], 201);
    }

    // View single appointment
    public function show($id)
    {
        $appointment = Appointment::with(['user', 'timeSlot'])->find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $user = Auth::user();
        if ($user->role !== 'admin' && $appointment->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($appointment);
    }

    // Update appointment status (admin only)
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $appointment = Appointment::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $appointment->status = $validated['status'];
        $appointment->save();

        return response()->json(['message' => 'Appointment updated.', 'data' => $appointment]);
    }

    // Delete appointment (admin or owner)
    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $user = Auth::user();

        if (!($user->role === 'admin' || $appointment->user_id === $user->id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // Free the time slot
        $timeSlot = $appointment->timeSlot;
        if ($timeSlot) {
            $timeSlot->is_booked = false;
            $timeSlot->save();
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted.']);
    }
}
