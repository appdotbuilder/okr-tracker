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
        Schema::create('key_results', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Key result title');
            $table->text('description')->nullable()->comment('Key result description');
            $table->foreignId('objective_id')->constrained('objectives')->onDelete('cascade');
            $table->enum('type', ['number', 'percentage', 'boolean'])->default('number')->comment('Key result type');
            $table->decimal('target_value', 10, 2)->nullable()->comment('Target value to achieve');
            $table->decimal('current_value', 10, 2)->default(0)->comment('Current achieved value');
            $table->string('unit')->nullable()->comment('Unit of measurement');
            $table->enum('status', ['not_started', 'in_progress', 'completed', 'at_risk'])->default('not_started')->comment('Key result status');
            $table->integer('progress')->default(0)->comment('Progress percentage (0-100)');
            $table->date('due_date')->nullable()->comment('Key result due date');
            $table->timestamps();
            
            $table->index('objective_id');
            $table->index('status');
            $table->index('due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('key_results');
    }
};