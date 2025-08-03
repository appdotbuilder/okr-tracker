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
        Schema::create('okr_periods', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Period name (e.g., Q1 2024)');
            $table->enum('type', ['quarterly', 'yearly'])->default('quarterly')->comment('Period type');
            $table->date('start_date')->comment('Period start date');
            $table->date('end_date')->comment('Period end date');
            $table->boolean('is_active')->default(false)->comment('Current active period');
            $table->timestamps();
            
            $table->index(['start_date', 'end_date']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('okr_periods');
    }
};