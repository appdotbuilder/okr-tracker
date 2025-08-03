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
    description?: string;
    okr_period_id: number;
    status: string;
    progress: number;
    due_date?: string;
}

interface Props {
    objective: Objective;
    periods: OkrPeriod[];
    [key: string]: unknown;
}

interface ObjectiveFormData {
    title: string;
    description: string;
    okr_period_id: string;
    status: string;
    progress: number;
    due_date: string;
    [key: string]: string | number;
}

interface Errors {
    [key: string]: string;
}

export default function EditObjective({ objective, periods }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Objectives',
            href: '/objectives',
        },
        {
            title: objective.title,
            href: `/objectives/${objective.id}`,
        },
        {
            title: 'Edit',
            href: `/objectives/${objective.id}/edit`,
        },
    ];

    const [formData, setFormData] = useState<ObjectiveFormData>({
        title: objective.title,
        description: objective.description || '',
        okr_period_id: objective.okr_period_id.toString(),
        status: objective.status,
        progress: objective.progress,
        due_date: objective.due_date ? objective.due_date.split('T')[0] : '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.put(`/objectives/${objective.id}`, formData, {
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
            [name]: type === 'number' ? parseInt(value) || 0 : value 
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${objective.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Objective</h1>
                    <p className="text-gray-600 mt-1">Update your objective details and progress</p>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.get(`/objectives/${objective.id}`)}
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
                                        <span>Update Objective</span>
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