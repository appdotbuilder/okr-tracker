<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKeyResultRequest extends FormRequest
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
            'type' => 'required|in:number,percentage,boolean',
            'target_value' => 'required|numeric|min:0',
            'current_value' => 'required|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'status' => 'required|in:not_started,in_progress,completed,at_risk',
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
            'title.required' => 'Key result title is required.',
            'type.required' => 'Please select key result type.',
            'target_value.required' => 'Target value is required.',
            'target_value.min' => 'Target value must be at least 0.',
            'current_value.required' => 'Current value is required.',
            'current_value.min' => 'Current value must be at least 0.',
            'status.required' => 'Please select key result status.',
            'progress.required' => 'Progress is required.',
            'progress.min' => 'Progress cannot be less than 0%.',
            'progress.max' => 'Progress cannot be more than 100%.',
        ];
    }
}