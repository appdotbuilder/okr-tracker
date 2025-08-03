<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access and user management capabilities'
            ],
            [
                'name' => 'manager',
                'display_name' => 'Manager',
                'description' => 'Can manage team OKRs and view subordinate progress'
            ],
            [
                'name' => 'employee',
                'display_name' => 'Employee',
                'description' => 'Can create and manage own OKRs'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}