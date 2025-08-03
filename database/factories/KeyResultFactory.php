<?php

namespace Database\Factories;

use App\Models\Objective;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KeyResult>
 */
class KeyResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['number', 'percentage', 'boolean']);
        $targetValue = $type === 'percentage' ? fake()->numberBetween(1, 100) : fake()->numberBetween(1, 1000);
        $currentValue = fake()->numberBetween(0, $targetValue);

        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'objective_id' => Objective::factory(),
            'type' => $type,
            'target_value' => $targetValue,
            'current_value' => $currentValue,
            'unit' => $type === 'percentage' ? '%' : fake()->randomElement(['units', 'hours', 'customers', 'revenue']),
            'status' => fake()->randomElement(['not_started', 'in_progress', 'completed', 'at_risk']),
            'progress' => fake()->numberBetween(0, 100),
            'due_date' => fake()->dateTimeBetween('now', '+3 months'),
        ];
    }
}