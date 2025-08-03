<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            OkrPeriodSeeder::class,
        ]);

        // Create a test admin user
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role_id' => 1, // admin role
            'position' => 'System Administrator',
        ]);

        // Create a test manager
        \App\Models\User::factory()->create([
            'name' => 'Manager User',
            'email' => 'manager@example.com',
            'role_id' => 2, // manager role
            'position' => 'Team Manager',
        ]);

        // Create test employees
        \App\Models\User::factory()->create([
            'name' => 'Employee User',
            'email' => 'employee@example.com',
            'role_id' => 3, // employee role
            'position' => 'Software Developer',
            'manager_id' => 2, // managed by manager user
        ]);
    }
}
