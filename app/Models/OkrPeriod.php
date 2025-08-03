<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\OkrPeriod
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Objective> $objectives
 * @property-read int|null $objectives_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod query()
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OkrPeriod active()
 * @method static \Database\Factories\OkrPeriodFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OkrPeriod extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'type',
        'start_date',
        'end_date',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get the objectives for this period.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function objectives(): HasMany
    {
        return $this->hasMany(Objective::class);
    }

    /**
     * Scope a query to only include active periods.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}