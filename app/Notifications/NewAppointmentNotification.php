<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewAppointmentNotification extends Notification
{
    use Queueable;

    protected $appointment;

    public function __construct($appointment)
    {
        $this->appointment = $appointment;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'Patient_Name' => $this->appointment->user->name,
            'Date' => $this->appointment->timeSlot->date,
            'Time' => $this->appointment->timeSlot->time,
            'Message' => 'New appointment booked!'
        ];
    }
}