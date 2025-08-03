<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Objective
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $user_id
 * @property int $okr_period_id
 * @property string $status
 * @property int $progress
 * @property \Illuminate\Support\Carbon|null $due_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\OkrPeriod $okrPeriod
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KeyResult> $keyResults
 * @property-read int|null $key_results_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Objective newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Objective newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Objective query()
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereOkrPeriodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Objective whereUserId($value)
 * @method static \Database\Factories\ObjectiveFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Objective extends Model
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
        'user_id',
        'okr_period_id',
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
    ];

    /**
     * Get the user that owns this objective.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the OKR period this objective belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function okrPeriod(): BelongsTo
    {
        return $this->belongsTo(OkrPeriod::class);
    }

    /**
     * Get the key results for this objective.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function keyResults(): HasMany
    {
        return $this->hasMany(KeyResult::class);
    }
}