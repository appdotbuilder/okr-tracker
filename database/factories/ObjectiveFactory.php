<?php

namespace Database\Factories;

use App\Models\OkrPeriod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Objective>
 */
class ObjectiveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'user_id' => User::factory(),
            'okr_period_id' => OkrPeriod::factory(),
            'status' => fake()->randomElement(['draft', 'active', 'completed', 'cancelled']),
            'progress' => fake()->numberBetween(0, 100),
            'due_date' => fake()->dateTimeBetween('now', '+3 months'),
        ];
    }
}