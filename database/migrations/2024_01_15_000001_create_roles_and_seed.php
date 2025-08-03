<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('Role name (admin, manager, employee)');
            $table->string('display_name')->comment('Human readable role name');
            $table->text('description')->nullable()->comment('Role description');
            $table->timestamps();
            
            $table->index('name');
        });

        // Insert default roles immediately
        DB::table('roles')->insert([
            [
                'id' => 1,
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access and user management capabilities',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'manager',
                'display_name' => 'Manager',
                'description' => 'Can manage team OKRs and view subordinate progress',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'employee',
                'display_name' => 'Employee',
                'description' => 'Can create and manage own OKRs',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};