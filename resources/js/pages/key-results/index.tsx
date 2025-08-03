import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
    objective: Objective;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface Props {
    keyResults: {
        data: KeyResult[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Key Results',
        href: '/key-results',
    },
];

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

export default function KeyResultsIndex({ keyResults }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Key Results" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Key Results</h1>
                        <p className="text-gray-600 mt-1">Track and manage your key results</p>
                    </div>
                    <Link href="/key-results/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>New Key Result</span>
                        </Button>
                    </Link>
                </div>

                {/* Key Results List */}
                <div className="bg-white rounded-lg shadow-sm border">
                    {keyResults.data.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {keyResults.data.map((keyResult) => (
                                <div key={keyResult.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-xl">{getTypeIcon(keyResult.type)}</span>
                                                <Link
                                                    href={`/key-results/${keyResult.id}`}
                                                    className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                                                >
                                                    {keyResult.title}
                                                </Link>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(keyResult.status)}`}>
                                                    {keyResult.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            {keyResult.description && (
                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                    {keyResult.description}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>🎯 {keyResult.objective.title}</span>
                                                <span>👤 {keyResult.objective.user.name}</span>
                                                <span>📅 {keyResult.objective.okr_period.name}</span>
                                                {keyResult.due_date && (
                                                    <span>⏰ Due: {new Date(keyResult.due_date).toLocaleDateString()}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 mb-1">Progress</div>
                                                <div className="text-2xl font-bold text-blue-600">{keyResult.progress}%</div>
                                            </div>
                                            <div className="w-24">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div 
                                                        className={`h-3 rounded-full transition-all ${getProgressColor(keyResult.progress)}`}
                                                        style={{ width: `${keyResult.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span>
                                                <span className="font-medium">Current:</span> {keyResult.current_value} {keyResult.unit || ''}
                                            </span>
                                            <span>
                                                <span className="font-medium">Target:</span> {keyResult.target_value} {keyResult.unit || ''}
                                            </span>
                                            <span>
                                                Created {new Date(keyResult.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={`/key-results/${keyResult.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            <Link href={`/key-results/${keyResult.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-8xl mb-4 block">📊</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No key results found</h3>
                            <p className="text-gray-600 mb-6">
                                Get started by creating your first key result.
                            </p>
                            <Link href="/key-results/create">
                                <Button>🚀 Create Your First Key Result</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {keyResults.meta.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-sm text-gray-600">
                            Showing {keyResults.meta.from} to {keyResults.meta.to} of {keyResults.meta.total} results
                        </div>
                        <div className="flex space-x-2">
                            {keyResults.links.map((link, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (link.url) {
                                            window.location.href = link.url;
                                        }
                                    }}
                                    disabled={!link.url}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active 
                                            ? 'bg-blue-600 text-white' 
                                            : link.url 
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}