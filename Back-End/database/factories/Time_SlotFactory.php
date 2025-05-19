<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Time_Slot>
 */
class Time_SlotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'date' => $this->faker->dateTimeBetween('now', '+2 weeks')->format('Y-m-d'),
        'time' => $this->faker->randomElement(['10:00', '11:00', '12:00', '14:00', '15:00', '16:00']),
        'is_booked' => false,
    ];
    }
}
