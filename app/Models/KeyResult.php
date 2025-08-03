<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\KeyResult
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $objective_id
 * @property string $type
 * @property string|null $target_value
 * @property string $current_value
 * @property string|null $unit
 * @property string $status
 * @property int $progress
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Objective $objective
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereCurrentValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereObjectiveId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereTargetValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KeyResult whereUpdatedAt($value)
 * @method static \Database\Factories\KeyResultFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class KeyResult extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'objective_id',
        'type',
        'target_value',
        'current_value',
        'unit',
        'status',
        'progress',
        'due_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'due_date' => 'date',
        'progress' => 'integer',
        'target_value' => 'decimal:2',
        'current_value' => 'decimal:2',
    ];

    /**
     * Get the objective that owns this key result.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function objective(): BelongsTo
    {
        return $this->belongsTo(Objective::class);
    }
}