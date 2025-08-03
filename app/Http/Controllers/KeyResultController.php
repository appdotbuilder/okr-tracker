<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKeyResultRequest;
use App\Http\Requests\UpdateKeyResultRequest;
use App\Models\KeyResult;
use App\Models\Objective;
use Inertia\Inertia;

class KeyResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = KeyResult::with(['objective.user', 'objective.okrPeriod']);
        
        // Filter by current user's key results unless user is admin/manager
        if (!auth()->user()->isAdmin() && !auth()->user()->isManager()) {
            $query->whereHas('objective', function ($q) {
                $q->where('user_id', auth()->id());
            });
        }
        
        $keyResults = $query->latest()->paginate(10);
        
        return Inertia::render('key-results/index', [
            'keyResults' => $keyResults
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $objectives = Objective::where('user_id', auth()->id())
            ->with('okrPeriod')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return Inertia::render('key-results/create', [
            'objectives' => $objectives
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKeyResultRequest $request)
    {
        // Check if user owns the objective
        $objective = Objective::findOrFail($request->objective_id);
        if (!auth()->user()->isAdmin() && $objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to add key results to this objective.');
        }
        
        $keyResult = KeyResult::create([
            ...$request->validated(),
            'progress' => 0,
        ]);

        return redirect()->route('key-results.show', $keyResult)
            ->with('success', 'Key result created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(KeyResult $keyResult)
    {
        // Check if user can view this key result
        if (!auth()->user()->isAdmin() && !auth()->user()->isManager() && $keyResult->objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to view this key result.');
        }
        
        $keyResult->load(['objective.user', 'objective.okrPeriod']);
        
        return Inertia::render('key-results/show', [
            'keyResult' => $keyResult
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KeyResult $keyResult)
    {
        // Check if user can edit this key result
        if (!auth()->user()->isAdmin() && $keyResult->objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to edit this key result.');
        }
        
        return Inertia::render('key-results/edit', [
            'keyResult' => $keyResult->load('objective')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKeyResultRequest $request, KeyResult $keyResult)
    {
        // Check if user can update this key result
        if (!auth()->user()->isAdmin() && $keyResult->objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to update this key result.');
        }
        
        $keyResult->update($request->validated());

        return redirect()->route('key-results.show', $keyResult)
            ->with('success', 'Key result updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KeyResult $keyResult)
    {
        // Check if user can delete this key result
        if (!auth()->user()->isAdmin() && $keyResult->objective->user_id !== auth()->id()) {
            abort(403, 'Unauthorized to delete this key result.');
        }
        
        $keyResult->delete();

        return redirect()->route('key-results.index')
            ->with('success', 'Key result deleted successfully.');
    }
}