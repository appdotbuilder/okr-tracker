import React, { useState } from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Objective {
    id: number;
    title: string;
}

interface KeyResult {
    id: number;
    title: string;
    description?: string;
    type: string;
    target_value: number;
    current_value: number;
    unit?: string;
    status: string;
    progress: number;
    due_date?: string;
    objective: Objective;
}

interface Props {
    keyResult: KeyResult;
    [key: string]: unknown;
}

interface KeyResultFormData {
    title: string;
    description: string;
    type: string;
    target_value: string;
    current_value: string;
    unit: string;
    status: string;
    progress: number;
    due_date: string;
    [key: string]: string | number;
}

interface Errors {
    [key: string]: string;
}

export default function EditKeyResult({ keyResult }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Key Results',
            href: '/key-results',
        },
        {
            title: keyResult.title,
            href: `/key-results/${keyResult.id}`,
        },
        {
            title: 'Edit',
            href: `/key-results/${keyResult.id}/edit`,
        },
    ];

    const [formData, setFormData] = useState<KeyResultFormData>({
        title: keyResult.title,
        description: keyResult.description || '',
        type: keyResult.type,
        target_value: keyResult.target_value.toString(),
        current_value: keyResult.current_value.toString(),
        unit: keyResult.unit || '',
        status: keyResult.status,
        progress: keyResult.progress,
        due_date: keyResult.due_date ? keyResult.due_date.split('T')[0] : '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.put(`/key-results/${keyResult.id}`, formData, {
            onSuccess: () => {
                // Will redirect automatically
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? (name === 'progress' ? parseInt(value) || 0 : value) : value 
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const getTypeIcon = (type: string): string => {
        switch (type) {
            case 'number':
                return '🔢';
            case 'percentage':
                return '📊';
            case 'boolean':
                return '☑️';
            default:
                return '📈';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${keyResult.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Key Result</h1>
                    <p className="text-gray-600 mt-1">Update your key result details and progress</p>
                </div>

                {/* Parent Objective Info */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg">🎯</span>
                        <span className="font-medium text-blue-900">Parent Objective:</span>
                        <span className="text-blue-800">{keyResult.objective.title}</span>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Key Result Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                    errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="e.g., Acquire 1000 new users"
                                required
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="Provide additional context about this key result..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Type */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Type *
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.type ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    required
                                >
                                    <option value="number">{getTypeIcon('number')} Number</option>
                                    <option value="percentage">{getTypeIcon('percentage')} Percentage</option>
                                    <option value="boolean">{getTypeIcon('boolean')} Boolean</option>
                                </select>
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.status ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    required
                                >
                                    <option value="not_started">⏸️ Not Started</option>
                                    <option value="in_progress">🚀 In Progress</option>
                                    <option value="completed">✅ Completed</option>
                                    <option value="at_risk">⚠️ At Risk</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Target Value */}
                            <div>
                                <label htmlFor="target_value" className="block text-sm font-medium text-gray-700 mb-2">
                                    Target Value *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="target_value"
                                    name="target_value"
                                    value={formData.target_value}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.target_value ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="e.g., 1000"
                                    required
                                />
                                {errors.target_value && (
                                    <p className="mt-1 text-sm text-red-600">{errors.target_value}</p>
                                )}
                            </div>

                            {/* Current Value */}
                            <div>
                                <label htmlFor="current_value" className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Value *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="current_value"
                                    name="current_value"
                                    value={formData.current_value}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.current_value ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="e.g., 250"
                                    required
                                />
                                {errors.current_value && (
                                    <p className="mt-1 text-sm text-red-600">{errors.current_value}</p>
                                )}
                            </div>

                            {/* Progress */}
                            <div>
                                <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-2">
                                    Progress (%) *
                                </label>
                                <input
                                    type="number"
                                    id="progress"
                                    name="progress"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.progress ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    required
                                />
                                {errors.progress && (
                                    <p className="mt-1 text-sm text-red-600">{errors.progress}</p>
                                )}
                            </div>

                            {/* Unit */}
                            <div>
                                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                                    Unit
                                </label>
                                <input
                                    type="text"
                                    id="unit"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.unit ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    placeholder="e.g., users, %, $"
                                />
                                {errors.unit && (
                                    <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                                )}
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="due_date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleInputChange}
                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                    errors.due_date ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            />
                            {errors.due_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.get(`/key-results/${keyResult.id}`)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>💾</span>
                                        <span>Update Key Result</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}