<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateObjectiveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'okr_period_id' => 'required|exists:okr_periods,id',
            'status' => 'required|in:draft,active,completed,cancelled',
            'progress' => 'required|integer|min:0|max:100',
            'due_date' => 'nullable|date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Objective title is required.',
            'okr_period_id.required' => 'Please select an OKR period.',
            'okr_period_id.exists' => 'Selected OKR period is invalid.',
            'status.required' => 'Please select objective status.',
            'progress.required' => 'Progress is required.',
            'progress.min' => 'Progress cannot be less than 0%.',
            'progress.max' => 'Progress cannot be more than 100%.',
        ];
    }
}