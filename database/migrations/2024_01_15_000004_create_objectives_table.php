<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('objectives', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Objective title');
            $table->text('description')->nullable()->comment('Objective description');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('okr_period_id')->constrained('okr_periods')->onDelete('cascade');
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('draft')->comment('Objective status');
            $table->integer('progress')->default(0)->comment('Progress percentage (0-100)');
            $table->date('due_date')->nullable()->comment('Objective due date');
            $table->timestamps();
            
            $table->index(['user_id', 'okr_period_id']);
            $table->index('status');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('objectives');
    }
};