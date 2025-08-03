import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
}

interface OkrPeriod {
    id: number;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
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
    created_at: string;
}

interface Objective {
    id: number;
    title: string;
    description?: string;
    status: string;
    progress: number;
    due_date?: string;
    created_at: string;
    updated_at: string;
    user: User;
    okr_period: OkrPeriod;
    key_results: KeyResult[];
}

interface Props {
    objective: Objective;
    [key: string]: unknown;
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'active':
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'draft':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
        case 'at_risk':
            return 'bg-red-100 text-red-800';
        case 'not_started':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function getProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
}

function getTypeIcon(type: string): string {
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
}

export default function ShowObjective({ objective }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Objectives',
            href: '/objectives',
        },
        {
            title: objective.title,
            href: `/objectives/${objective.id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this objective? This action cannot be undone.')) {
            router.delete(`/objectives/${objective.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={objective.title} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{objective.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(objective.status)}`}>
                                {objective.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>👤 {objective.user.name}</span>
                            <span>📅 {objective.okr_period.name}</span>
                            {objective.due_date && (
                                <span>⏰ Due: {new Date(objective.due_date).toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/objectives/${objective.id}/edit`}>
                            <Button variant="outline" className="flex items-center space-x-2">
                                <span>✏️</span>
                                <span>Edit</span>
                            </Button>
                        </Link>
                        <Button 
                            variant="outline" 
                            onClick={handleDelete}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <span>🗑️</span>
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{objective.progress}%</div>
                            <div className="text-sm text-gray-600">Overall Progress</div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div 
                                    className={`h-3 rounded-full transition-all ${getProgressColor(objective.progress)}`}
                                    style={{ width: `${objective.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">{objective.key_results.length}</div>
                            <div className="text-sm text-gray-600">Key Results</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {objective.key_results.filter(kr => kr.status === 'completed').length} completed
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                {objective.due_date ? Math.ceil((new Date(objective.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600">Days Remaining</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {objective.due_date ? (new Date(objective.due_date) > new Date() ? 'Until deadline' : 'Overdue') : 'No deadline set'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {objective.description && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">📝 Description</h2>
                        <p className="text-gray-700 leading-relaxed">{objective.description}</p>
                    </div>
                )}

                {/* Key Results */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">📊 Key Results</h2>
                            <Link href="/key-results/create" className="text-blue-600 hover:text-blue-800 text-sm">
                                ➕ Add Key Result
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        {objective.key_results.length > 0 ? (
                            <div className="space-y-4">
                                {objective.key_results.map((keyResult) => (
                                    <div key={keyResult.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-lg">{getTypeIcon(keyResult.type)}</span>
                                                    <Link
                                                        href={`/key-results/${keyResult.id}`}
                                                        className="font-semibold text-gray-900 hover:text-blue-600"
                                                    >
                                                        {keyResult.title}
                                                    </Link>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(keyResult.status)}`}>
                                                        {keyResult.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                                {keyResult.description && (
                                                    <p className="text-gray-600 text-sm mb-2">{keyResult.description}</p>
                                                )}
                                            </div>
                                            <div className="text-right ml-4">
                                                <div className="text-sm text-gray-600 mb-1">Progress</div>
                                                <div className="text-xl font-bold text-blue-600">{keyResult.progress}%</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Current:</span> {keyResult.current_value} {keyResult.unit || ''}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium">Target:</span> {keyResult.target_value} {keyResult.unit || ''}
                                                </div>
                                                {keyResult.due_date && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">Due:</span> {new Date(keyResult.due_date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-32">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all ${getProgressColor(keyResult.progress)}`}
                                                        style={{ width: `${keyResult.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-6xl mb-4 block">📊</span>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No key results yet</h3>
                                <p className="text-gray-600 mb-4">Key results help measure progress toward your objective.</p>
                                <Link href="/key-results/create">
                                    <Button>📈 Add Your First Key Result</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Timeline</h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Created on {new Date(objective.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Last updated on {new Date(objective.updated_at).toLocaleDateString()}</span>
                        </div>
                        {objective.due_date && (
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-gray-600">Due date: {new Date(objective.due_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}