<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewAppointmentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $appointment;

    public function __construct($appointment)
    {
        $this->appointment = $appointment;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'patient_name' => $this->appointment->user->name,
            'date' => $this->appointment->timeSlot->date,
            'time' => $this->appointment->timeSlot->time,
            'appointment_id' => $this->appointment->id,
            'message' => 'New appointment booked by ' . $this->appointment->user->name
        ];
    }
}