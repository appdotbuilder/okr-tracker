<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OkrPeriod>
 */
class OkrPeriodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-1 year', '+1 year');
        $endDate = fake()->dateTimeBetween($startDate, '+3 months');

        return [
            'name' => fake()->word() . ' ' . fake()->year(),
            'type' => fake()->randomElement(['quarterly', 'yearly']),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'is_active' => fake()->boolean(20), // 20% chance of being active
        ];
    }
}