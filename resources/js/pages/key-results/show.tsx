import React from 'react';
import AppLayout from '@/components/app-layout';
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

interface Objective {
    id: number;
    title: string;
    user: User;
    okr_period: OkrPeriod;
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
    updated_at: string;
    objective: Objective;
}

interface Props {
    keyResult: KeyResult;
    [key: string]: unknown;
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
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

export default function ShowKeyResult({ keyResult }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Key Results',
            href: '/key-results',
        },
        {
            title: keyResult.title,
            href: `/key-results/${keyResult.id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this key result? This action cannot be undone.')) {
            router.delete(`/key-results/${keyResult.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={keyResult.title} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-3xl">{getTypeIcon(keyResult.type)}</span>
                            <h1 className="text-3xl font-bold text-gray-900">{keyResult.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(keyResult.status)}`}>
                                {keyResult.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <Link 
                                href={`/objectives/${keyResult.objective.id}`}
                                className="hover:text-blue-600"
                            >
                                🎯 {keyResult.objective.title}
                            </Link>
                            <span>👤 {keyResult.objective.user.name}</span>
                            <span>📅 {keyResult.objective.okr_period.name}</span>
                            {keyResult.due_date && (
                                <span>⏰ Due: {new Date(keyResult.due_date).toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/key-results/${keyResult.id}/edit`}>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{keyResult.progress}%</div>
                            <div className="text-sm text-gray-600">Progress</div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div 
                                    className={`h-3 rounded-full transition-all ${getProgressColor(keyResult.progress)}`}
                                    style={{ width: `${keyResult.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">{keyResult.current_value}</div>
                            <div className="text-sm text-gray-600">Current Value</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {keyResult.unit || 'units'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">{keyResult.target_value}</div>
                            <div className="text-sm text-gray-600">Target Value</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {keyResult.unit || 'units'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-2">
                                {keyResult.due_date ? Math.ceil((new Date(keyResult.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600">Days Remaining</div>
                            <div className="text-xs text-gray-500 mt-2">
                                {keyResult.due_date ? (new Date(keyResult.due_date) > new Date() ? 'Until deadline' : 'Overdue') : 'No deadline set'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {keyResult.description && (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">📝 Description</h2>
                        <p className="text-gray-700 leading-relaxed">{keyResult.description}</p>
                    </div>
                )}

                {/* Details */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Type</span>
                                <span className="flex items-center space-x-2">
                                    <span>{getTypeIcon(keyResult.type)}</span>
                                    <span className="capitalize">{keyResult.type}</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Current Value</span>
                                <span className="font-bold text-blue-600">
                                    {keyResult.current_value} {keyResult.unit || ''}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Target Value</span>
                                <span className="font-bold text-green-600">
                                    {keyResult.target_value} {keyResult.unit || ''}
                                </span>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Status</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(keyResult.status)}`}>
                                    {keyResult.status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Progress</span>
                                <span className="font-bold text-purple-600">{keyResult.progress}%</span>
                            </div>
                            {keyResult.unit && (
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium text-gray-700">Unit</span>
                                    <span>{keyResult.unit}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Parent Objective */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Parent Objective</h2>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <Link
                            href={`/objectives/${keyResult.objective.id}`}
                            className="text-lg font-semibold text-blue-600 hover:text-blue-800 block mb-2"
                        >
                            {keyResult.objective.title}
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>👤 {keyResult.objective.user.name}</span>
                            <span>📅 {keyResult.objective.okr_period.name}</span>
                            <span>📊 {keyResult.objective.okr_period.type}</span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Timeline</h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">Created on {new Date(keyResult.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600">Last updated on {new Date(keyResult.updated_at).toLocaleDateString()}</span>
                        </div>
                        {keyResult.due_date && (
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-gray-600">Due date: {new Date(keyResult.due_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}