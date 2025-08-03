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

interface Objective {
    id: number;
    title: string;
    description?: string;
    status: string;
    progress: number;
    due_date?: string;
    created_at: string;
    user: User;
    okr_period: OkrPeriod;
    key_results_count?: number;
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
    objectives: {
        data: Objective[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    periods: OkrPeriod[];
    filters: {
        period?: string;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Objectives',
        href: '/objectives',
    },
];

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'active':
            return 'bg-blue-100 text-blue-800';
        case 'draft':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
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

export default function ObjectivesIndex({ objectives, periods, filters }: Props) {
    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters };
        if (value === '') {
            delete newFilters[key as keyof typeof filters];
        } else {
            newFilters[key as keyof typeof filters] = value;
        }
        
        router.get('/objectives', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Objectives" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🎯 Objectives</h1>
                        <p className="text-gray-600 mt-1">Manage and track your objectives</p>
                    </div>
                    <Link href="/objectives/create">
                        <Button className="flex items-center space-x-2">
                            <span>➕</span>
                            <span>New Objective</span>
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Period</label>
                            <select
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                value={filters.period || ''}
                                onChange={(e) => handleFilter('period', e.target.value)}
                            >
                                <option value="">All Periods</option>
                                {periods.map((period) => (
                                    <option key={period.id} value={period.id}>
                                        {period.name} {period.is_active && '(Active)'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                value={filters.status || ''}
                                onChange={(e) => handleFilter('status', e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="draft">Draft</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Objectives List */}
                <div className="bg-white rounded-lg shadow-sm border">
                    {objectives.data.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {objectives.data.map((objective) => (
                                <div key={objective.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Link
                                                    href={`/objectives/${objective.id}`}
                                                    className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                                                >
                                                    {objective.title}
                                                </Link>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                                                    {objective.status.toUpperCase()}
                                                </span>
                                            </div>
                                            {objective.description && (
                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                    {objective.description}
                                                </p>
                                            )}
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>👤 {objective.user.name}</span>
                                                <span>📅 {objective.okr_period.name}</span>
                                                {objective.due_date && (
                                                    <span>⏰ Due: {new Date(objective.due_date).toLocaleDateString()}</span>
                                                )}
                                                <span>📊 {objective.key_results_count || 0} Key Results</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600 mb-1">Progress</div>
                                                <div className="text-2xl font-bold text-blue-600">{objective.progress}%</div>
                                            </div>
                                            <div className="w-24">
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div 
                                                        className={`h-3 rounded-full transition-all ${getProgressColor(objective.progress)}`}
                                                        style={{ width: `${objective.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Created {new Date(objective.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={`/objectives/${objective.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            <Link href={`/objectives/${objective.id}/edit`}>
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
                            <span className="text-8xl mb-4 block">🎯</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No objectives found</h3>
                            <p className="text-gray-600 mb-6">
                                {Object.keys(filters).length > 0 
                                    ? 'Try adjusting your filters or create a new objective.'
                                    : 'Get started by creating your first objective.'
                                }
                            </p>
                            <Link href="/objectives/create">
                                <Button>🚀 Create Your First Objective</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {objectives.meta.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-4">
                        <div className="text-sm text-gray-600">
                            Showing {objectives.meta.from} to {objectives.meta.to} of {objectives.meta.total} results
                        </div>
                        <div className="flex space-x-2">
                            {objectives.links.map((link, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (link.url) {
                                            router.get(link.url, filters, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
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