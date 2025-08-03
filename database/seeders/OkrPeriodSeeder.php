<?php

namespace Database\Seeders;

use App\Models\OkrPeriod;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OkrPeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = Carbon::now()->year;
        
        $periods = [
            [
                'name' => "Q1 {$currentYear}",
                'type' => 'quarterly',
                'start_date' => Carbon::createFromDate($currentYear, 1, 1),
                'end_date' => Carbon::createFromDate($currentYear, 3, 31),
                'is_active' => Carbon::now()->between(
                    Carbon::createFromDate($currentYear, 1, 1),
                    Carbon::createFromDate($currentYear, 3, 31)
                )
            ],
            [
                'name' => "Q2 {$currentYear}",
                'type' => 'quarterly',
                'start_date' => Carbon::createFromDate($currentYear, 4, 1),
                'end_date' => Carbon::createFromDate($currentYear, 6, 30),
                'is_active' => Carbon::now()->between(
                    Carbon::createFromDate($currentYear, 4, 1),
                    Carbon::createFromDate($currentYear, 6, 30)
                )
            ],
            [
                'name' => "Q3 {$currentYear}",
                'type' => 'quarterly',
                'start_date' => Carbon::createFromDate($currentYear, 7, 1),
                'end_date' => Carbon::createFromDate($currentYear, 9, 30),
                'is_active' => Carbon::now()->between(
                    Carbon::createFromDate($currentYear, 7, 1),
                    Carbon::createFromDate($currentYear, 9, 30)
                )
            ],
            [
                'name' => "Q4 {$currentYear}",
                'type' => 'quarterly',
                'start_date' => Carbon::createFromDate($currentYear, 10, 1),
                'end_date' => Carbon::createFromDate($currentYear, 12, 31),
                'is_active' => Carbon::now()->between(
                    Carbon::createFromDate($currentYear, 10, 1),
                    Carbon::createFromDate($currentYear, 12, 31)
                )
            ],
            [
                'name' => "{$currentYear} Annual",
                'type' => 'yearly',
                'start_date' => Carbon::createFromDate($currentYear, 1, 1),
                'end_date' => Carbon::createFromDate($currentYear, 12, 31),
                'is_active' => false
            ]
        ];

        foreach ($periods as $period) {
            OkrPeriod::firstOrCreate(
                ['name' => $period['name']],
                $period
            );
        }
    }
}