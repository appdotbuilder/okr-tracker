import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
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

interface Props {
    periods: OkrPeriod[];
    [key: string]: unknown;
}

interface ObjectiveFormData {
    title: string;
    description: string;
    okr_period_id: string;
    status: string;
    due_date: string;
    [key: string]: string | number;
}

interface Errors {
    [key: string]: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Objectives',
        href: '/objectives',
    },
    {
        title: 'Create',
        href: '/objectives/create',
    },
];

export default function CreateObjective({ periods }: Props) {
    const [formData, setFormData] = useState<ObjectiveFormData>({
        title: '',
        description: '',
        okr_period_id: '',
        status: 'draft',
        due_date: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post('/objectives', formData, {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Objective" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🎯 Create New Objective</h1>
                    <p className="text-gray-600 mt-1">Define a clear, measurable objective for your OKR period</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Objective Title *
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
                                placeholder="e.g., Increase product adoption by 50%"
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
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                placeholder="Provide additional context and details about this objective..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* OKR Period */}
                            <div>
                                <label htmlFor="okr_period_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    OKR Period *
                                </label>
                                <select
                                    id="okr_period_id"
                                    name="okr_period_id"
                                    value={formData.okr_period_id}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                                        errors.okr_period_id ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                    } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    required
                                >
                                    <option value="">Select a period</option>
                                    {periods.map((period) => (
                                        <option key={period.id} value={period.id}>
                                            {period.name} {period.is_active && '(Active)'} - {period.type}
                                        </option>
                                    ))}
                                </select>
                                {errors.okr_period_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.okr_period_id}</p>
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
                                    <option value="draft">📝 Draft</option>
                                    <option value="active">🚀 Active</option>
                                    <option value="completed">✅ Completed</option>
                                    <option value="cancelled">❌ Cancelled</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
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
                                onClick={() => router.get('/objectives')}
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
                                        <span>Create Objective</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Writing Good Objectives</h3>
                    <ul className="space-y-2 text-blue-800">
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Make it <strong>specific and clear</strong> - avoid vague language</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Ensure it's <strong>ambitious yet achievable</strong> - stretch goals drive innovation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Focus on <strong>outcomes, not activities</strong> - what impact do you want to achieve?</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="mt-1">•</span>
                            <span>Keep it <strong>time-bound</strong> - align with your OKR period</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}