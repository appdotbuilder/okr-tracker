<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreObjectiveRequest;
use App\Http\Requests\UpdateObjectiveRequest;
use App\Models\Objective;
use App\Models\OkrPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ObjectiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Objective::with(['user', 'okrPeriod', 'keyResults']);
        
        // Filter by current user's objectives unless user is admin/manager
        if (!auth()->user()->isAdmin() && !auth()->user()->isManager()) {
            $query->where('user_id', auth()->id());
        }
        
        // Filter by period if specified
        if ($request->has('period')) {
            $query->where('okr_period_id', $request->period);
        }
        
        // Filter by status if specified
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        $objectives = $query->latest()->paginate(10);
        $periods = OkrPeriod::orderBy('start_date', 'desc')->get();
        
        return Inertia::render('objectives/index', [
            'objectives' => $objectives,
            'periods' => $periods,
            'filters' => $request->only(['period', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $periods = OkrPeriod::orderBy('start_date', 'desc')->get();
        
        return Inertia::render('objectives/create', [
            'periods' => $periods
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreObjectiveRequest $request)
    {
        $objective = Objective::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
            'progress' => 0,
        ]);

        return redirect()->route('objectives.show', $objective)
            ->with('success', 'Objective created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Objective $objective)
    {
        // Check if user can view this objective
        if (!auth()->user()->isAdmin() && !auth()->user()->isManager() && $objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to view this objective.');
        }
        
        $objective->load(['user', 'okrPeriod', 'keyResults']);
        
        return Inertia::render('objectives/show', [
            'objective' => $objective
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Objective $objective)
    {
        // Check if user can edit this objective
        if (!auth()->user()->isAdmin() && $objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to edit this objective.');
        }
        
        $periods = OkrPeriod::orderBy('start_date', 'desc')->get();
        
        return Inertia::render('objectives/edit', [
            'objective' => $objective,
            'periods' => $periods
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateObjectiveRequest $request, Objective $objective)
    {
        // Check if user can update this objective
        if (!auth()->user()->isAdmin() && $objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to update this objective.');
        }
        
        $objective->update($request->validated());

        return redirect()->route('objectives.show', $objective)
            ->with('success', 'Objective updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Objective $objective)
    {
        // Check if user can delete this objective
        if (!auth()->user()->isAdmin() && $objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to delete this objective.');
        }
        
        $objective->delete();

        return redirect()->route('objectives.index')
            ->with('success', 'Objective deleted successfully.');
    }
}