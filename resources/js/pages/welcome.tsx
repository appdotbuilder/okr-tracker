import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="OKR Management System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="px-6 py-4">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">OKR Pro</span>
                        </div>
                        <div className="flex space-x-4">
                            {auth.user ? (
                                <div className="flex space-x-4">
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Profile
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🎯 Achieve Your Goals with{' '}
                            <span className="text-blue-600">OKR Management</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Streamline your Objectives and Key Results management with our comprehensive platform. 
                            Set ambitious goals, track progress, and drive success across your organization.
                        </p>
                        
                        {auth.user ? (
                            <div className="flex justify-center space-x-4">
                                <Link href="/dashboard">
                                    <Button size="lg" className="px-8 py-3 text-lg">
                                        📊 Go to Dashboard
                                    </Button>
                                </Link>
                                <Link href="/objectives">
                                    <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                        🎯 View Objectives
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex justify-center space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="px-8 py-3 text-lg">
                                        🚀 Get Started Free
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-16 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            ✨ Everything You Need for OKR Success
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Objectives</h3>
                                <p className="text-gray-600">
                                    Create and manage ambitious objectives with clear descriptions, deadlines, and progress tracking.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Results Tracking</h3>
                                <p className="text-gray-600">
                                    Define measurable key results with targets, current values, and automatic progress calculation.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Management</h3>
                                <p className="text-gray-600">
                                    Role-based access for admins, managers, and employees with proper permissions and visibility.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📅</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Period Management</h3>
                                <p className="text-gray-600">
                                    Organize OKRs by quarters or yearly periods with clear timelines and active period tracking.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Visualization</h3>
                                <p className="text-gray-600">
                                    Beautiful progress bars, status indicators, and comprehensive dashboards to track performance.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔒</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
                                <p className="text-gray-600">
                                    Complete authentication system with email verification and secure role-based permissions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Demo Section */}
                <section className="px-6 py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            🎪 See It In Action
                        </h2>
                        
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="text-left">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        📋 Sample Objective: Increase Product Adoption
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                            <span className="font-medium">📊 Acquire 1000 new users</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                                <span className="text-sm font-medium">75%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                            <span className="font-medium">⭐ Improve rating to 4.5/5</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                                                </div>
                                                <span className="text-sm font-medium">90%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                            <span className="font-medium">💰 Generate $50K revenue</span>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                                </div>
                                                <span className="text-sm font-medium">60%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl">
                                    <h4 className="text-lg font-semibold mb-4">📈 Overall Progress</h4>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">75%</div>
                                        <div className="text-blue-100">On Track</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {!auth.user && (
                            <div className="text-center">
                                <p className="text-gray-600 mb-6">
                                    Ready to transform your goal management? Join thousands of teams already using OKR Pro.
                                </p>
                                <Link href="/register">
                                    <Button size="lg" className="px-8 py-3 text-lg">
                                        🎯 Start Your OKR Journey
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-8 bg-gray-900 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <span className="text-xl font-bold">OKR Pro</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Empowering teams to achieve extraordinary results through effective OKR management.
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-gray-400">
                            <span>🎯 Goal Setting</span>
                            <span>📊 Progress Tracking</span>
                            <span>👥 Team Collaboration</span>
                            <span>📈 Performance Analytics</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}