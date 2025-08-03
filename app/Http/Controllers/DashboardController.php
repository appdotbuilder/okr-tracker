<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\KeyResult;
use App\Models\Objective;
use App\Models\OkrPeriod;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with OKR overview.
     */
    public function index()
    {
        $user = auth()->user();
        $activePeriod = OkrPeriod::where('is_active', true)->first();
        
        // Get user's objectives for the active period
        $objectivesQuery = Objective::where('user_id', $user->id);
        if ($activePeriod) {
            $objectivesQuery->where('okr_period_id', $activePeriod->id);
        }
        
        $objectives = $objectivesQuery->with(['keyResults', 'okrPeriod'])->get();
        
        // Calculate statistics
        $stats = [
            'total_objectives' => $objectives->count(),
            'completed_objectives' => $objectives->where('status', 'completed')->count(),
            'in_progress_objectives' => $objectives->where('status', 'active')->count(),
            'average_progress' => $objectives->avg('progress') ?? 0,
        ];
        
        // Get recent key results
        $recentKeyResults = KeyResult::whereHas('objective', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->with(['objective'])
        ->orderBy('updated_at', 'desc')
        ->limit(5)
        ->get();
        
        // Get team overview for managers
        $teamStats = null;
        if ($user->isManager() || $user->isAdmin()) {
            $teamObjectives = Objective::when($user->isManager(), function ($q) use ($user) {
                $q->whereHas('user', function ($subq) use ($user) {
                    $subq->where('manager_id', $user->id);
                });
            })->with(['user', 'keyResults'])->get();
            
            $teamStats = [
                'total_team_objectives' => $teamObjectives->count(),
                'team_members' => $teamObjectives->pluck('user')->unique('id')->count(),
                'team_average_progress' => $teamObjectives->avg('progress') ?? 0,
            ];
        }
        
        return Inertia::render('dashboard', [
            'activePeriod' => $activePeriod,
            'objectives' => $objectives,
            'stats' => $stats,
            'recentKeyResults' => $recentKeyResults,
            'teamStats' => $teamStats,
        ]);
    }
}