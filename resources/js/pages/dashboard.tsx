import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        display_name: string;
    };
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
    progress: number;
    status: string;
    current_value: number;
    target_value: number;
    unit: string;
    objective: {
        title: string;
    };
}

interface Objective {
    id: number;
    title: string;
    status: string;
    progress: number;
    due_date?: string;
    key_results_count?: number;
    okr_period?: OkrPeriod;
}

interface Stats {
    total_objectives: number;
    completed_objectives: number;
    in_progress_objectives: number;
    average_progress: number;
}

interface TeamStats {
    total_team_objectives: number;
    team_members: number;
    team_average_progress: number;
}

interface Props {
    auth: {
        user: User;
    };
    activePeriod: OkrPeriod | null;
    objectives: Objective[];
    stats: Stats;
    recentKeyResults: KeyResult[];
    teamStats: TeamStats | null;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'active':
        case 'in_progress':
            return 'bg-blue-100 text-blue-800';
        case 'at_risk':
            return 'bg-red-100 text-red-800';
        case 'not_started':
            return 'bg-gray-100 text-gray-800';
        case 'draft':
            return 'bg-yellow-100 text-yellow-800';
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

export default function Dashboard({ 
    auth, 
    activePeriod, 
    objectives, 
    stats, 
    recentKeyResults, 
    teamStats 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            👋 Welcome back, {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {activePeriod ? `Current period: ${activePeriod.name}` : 'No active OKR period'}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/objectives/create">
                            <Button className="flex items-center space-x-2">
                                <span>🎯</span>
                                <span>New Objective</span>
                            </Button>
                        </Link>
                        <Link href="/key-results/create">
                            <Button variant="outline" className="flex items-center space-x-2">
                                <span>📊</span>
                                <span>New Key Result</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Objectives</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.total_objectives}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-green-600">{stats.completed_objectives}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">In Progress</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.in_progress_objectives}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🚀</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                                <p className="text-3xl font-bold text-purple-600">{Math.round(stats.average_progress)}%</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Objectives */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">🎯 My Objectives</h2>
                                <Link href="/objectives" className="text-blue-600 hover:text-blue-800 text-sm">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {objectives.length > 0 ? (
                                <div className="space-y-4">
                                    {objectives.slice(0, 5).map((objective) => (
                                        <div key={objective.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <Link 
                                                    href={`/objectives/${objective.id}`}
                                                    className="font-medium text-gray-900 hover:text-blue-600 flex-1"
                                                >
                                                    {objective.title}
                                                </Link>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                                                    {objective.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                                        <span>Progress</span>
                                                        <span>{objective.progress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all ${getProgressColor(objective.progress)}`}
                                                            style={{ width: `${objective.progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                {objective.due_date && (
                                                    <div className="text-xs text-gray-500">
                                                        Due: {new Date(objective.due_date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-6xl mb-4 block">🎯</span>
                                    <p className="text-gray-500 mb-4">No objectives yet</p>
                                    <Link href="/objectives/create">
                                        <Button>Create Your First Objective</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Key Results */}
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">📊 Recent Key Results</h2>
                                <Link href="/key-results" className="text-blue-600 hover:text-blue-800 text-sm">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentKeyResults.length > 0 ? (
                                <div className="space-y-4">
                                    {recentKeyResults.map((keyResult) => (
                                        <div key={keyResult.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <Link 
                                                    href={`/key-results/${keyResult.id}`}
                                                    className="font-medium text-gray-900 hover:text-blue-600 flex-1"
                                                >
                                                    {keyResult.title}
                                                </Link>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(keyResult.status)}`}>
                                                    {keyResult.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{keyResult.objective.title}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    {keyResult.current_value} / {keyResult.target_value} {keyResult.unit || ''}
                                                </div>
                                                <div className="text-sm font-medium text-blue-600">
                                                    {keyResult.progress}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-6xl mb-4 block">📊</span>
                                    <p className="text-gray-500 mb-4">No key results yet</p>
                                    <Link href="/key-results/create">
                                        <Button>Create Your First Key Result</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Team Stats for Managers */}
                {teamStats && (
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">👥 Team Overview</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{teamStats.total_team_objectives}</div>
                                    <div className="text-sm text-gray-600">Team Objectives</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{teamStats.team_members}</div>
                                    <div className="text-sm text-gray-600">Team Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">{Math.round(teamStats.team_average_progress)}%</div>
                                    <div className="text-sm text-gray-600">Team Avg Progress</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}