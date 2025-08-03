import React, { useState } from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface OkrPeriod {
    id: number;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

interface Objective {
    id: number;
    title: string;
    okr_period: OkrPeriod;
}

interface Props {
    objectives: Objective[];
    [key: string]: unknown;
}

interface KeyResultFormData {
    title: string;
    description: string;
    objective_id: string;
    type: string;
    target_value: string;
    current_value: string;
    unit: string;
    status: string;
    due_date: string;
    [key: string]: string | number;
}

interface Errors {
    [key: string]: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Key Results',
        href: '/key-results',
    },
    {
        title: 'Create',
        href: '/key-results/create',
    },
];

export default function CreateKeyResult({ objectives }: Props) {
    const [formData, setFormData] = useState<KeyResultFormData>({
        title: '',
        description: '',
        objective_id: '',
        type: 'number',
        target_value: '',
        current_value: '0',
        unit: '',
        status: 'not_started',
        due_date: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/key-results', formData, {
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
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
            <Head title="Create Key Result" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📊 Create New Key Result</h1>
                    <p className="text-gray-600 mt-1">Define a measurable key result to track objective progress</p>
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

                        {/* Objective */}
                        <div>
                            <label htmlFor="objective_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Parent Objective *
                            </label>
                            <select
                                id="objective_id"
                                name="objective_id"
                                value={formData.objective_id}
                                onChange={handleInputChange}
                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                    errors.objective_id ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                required
                            >
                                <option value="">Select an objective</option>
                                {objectives.map((objective) => (
                                    <option key={objective.id} value={objective.id}>
                                        {objective.title} - {objective.okr_period.name}
                                    </option>
                                ))}
                            </select>
                            {errors.objective_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.objective_id}</p>
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                    placeholder="e.g., 0"
                                    required
                                />
                                {errors.current_value && (
                                    <p className="mt-1 text-sm text-red-600">{errors.current_value}</p>
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
                                onClick={() => router.get('/key-results')}
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
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>💾</span>
                                        <span>Create Key Result</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Tips */}
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">💡 Tips for Effective Key Results</h3>
                    <ul className="space-y-2 text-green-800">
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Make it <strong>specific and measurable</strong> - use concrete numbers</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Focus on <strong>outcomes, not outputs</strong> - what impact will you achieve?</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Set <strong>ambitious but achievable</strong> targets - aim for 70-80% completion</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Update progress <strong>regularly</strong> to keep momentum</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}