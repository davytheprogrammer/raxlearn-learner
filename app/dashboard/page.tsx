'use client';

import Link from 'next/link';
import { skillPaths, Project, TechOption } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Target, Activity, Zap, Search, Bookmark, CheckCircle2, Award, Clock, ArrowRight, User, Loader2, Sparkles, BookOpen, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

export default function DashboardPage() {
    const { t } = useLanguage();
    const {
        profile,
        isLoading,
        getTotalTasksCompleted,
        getActiveTechOptions,
        getBookmarkedProjectsData,
        getLevelAndXP
    } = useUserProgress();

    const [activeProjectsDetails, setActiveProjectsDetails] = useState<{ project: Project, tech: TechOption, pathId: string, completed: number }[]>([]);
    const [bookmarkedProjectsDetails, setBookmarkedProjectsDetails] = useState<{ project: Project, pathId: string }[]>([]);

    const [dailyTip, setDailyTip] = useState<string | null>(null);
    const [isGeneratingTip, setIsGeneratingTip] = useState(false);

    useEffect(() => {
        if (isLoading || !profile) return;

        const activeData = getActiveTechOptions();
        const bookmarksData = getBookmarkedProjectsData();

        const activeList: typeof activeProjectsDetails = [];
        const bookmarkList: typeof bookmarkedProjectsDetails = [];

        skillPaths.forEach(path => {
            path.techOptions?.forEach(tech => {
                tech.projects.forEach(project => {
                    const activeMatch = activeData.find(a => a.projectId === project.id);
                    if (activeMatch) {
                        activeList.push({
                            project,
                            tech,
                            pathId: path.id,
                            completed: activeMatch.taskCompletions
                        });
                    }
                    if (bookmarksData.includes(project.id)) {
                        bookmarkList.push({ project, pathId: path.id });
                    }
                });
            });
        });

        setActiveProjectsDetails(activeList.sort((a, b) => b.completed - a.completed));
        setBookmarkedProjectsDetails(bookmarkList);
    }, [isLoading, profile, getActiveTechOptions, getBookmarkedProjectsData]);

    const generateAITip = async () => {
        if (isGeneratingTip) return;
        setIsGeneratingTip(true);
        try {
            const tasksCompleted = getTotalTasksCompleted();
            const activeTechCount = activeProjectsDetails.length;
            const context = `User Dashboard Data:\nTasks Completed: ${tasksCompleted}\nActive Projects: ${activeTechCount}\nInstruction: Generate a short, motivating 2-sentence tip for this developer learner. Be specific to their stats. Lead with encouragement.`;

            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: 'Give me a daily learning tip.' }],
                    context
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'API Error' }));
                throw new Error(`API Error: ${errorData.error || 'Unknown'}`);
            }

            const data = await res.json();
            setDailyTip(data.content);
        } catch {
            setDailyTip("Try completing 2 tasks per week to maintain consistent learning momentum and build compounding skills.");
        } finally {
            setIsGeneratingTip(false);
        }
    };

    useEffect(() => {
        if (!isLoading && profile && dailyTip === null && activeProjectsDetails.length >= 0) {
            generateAITip();
        }
    }, [isLoading, profile, dailyTip, activeProjectsDetails.length]);

    const tasksCompleted = getTotalTasksCompleted();
    const gamification = getLevelAndXP();

    useEffect(() => {
        if (!isLoading && gamification.progress > 85) {
            const timer = setTimeout(() => {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#14b8a6', '#f59e0b']
                });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, gamification.progress]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    const getRankTitle = (level: number) => {
        if (level < 2) return 'Junior Developer';
        if (level < 4) return 'Mid-Level Engineer';
        if (level < 6) return 'Senior Developer';
        if (level < 8) return 'Staff Engineer';
        return 'Principal Architect';
    };

    const rankTitle = getRankTitle(gamification.level);
    const xpToNext = gamification.xpRequiredForNextLevel - gamification.xpIntoLevel;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        raxlearn
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/paths" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium flex items-center gap-2 text-sm">
                            <Search size={16} /> Browse Paths
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center">
                            <User size={18} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Banner */}
            <section className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-2">
                            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Dashboard</p>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Welcome back 👋
                            </h1>
                            <p className="text-gray-400 max-w-lg">
                                You&apos;ve completed <span className="text-white font-semibold">{tasksCompleted} tasks</span> so far. Keep building — every project makes you better.
                            </p>
                        </div>
                        <Link
                            href="/paths"
                            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all flex items-center gap-2 self-start"
                        >
                            Continue Learning <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-emerald-600" />
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tasks Done</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{tasksCompleted}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                <Trophy size={20} className="text-orange-500" />
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{gamification.level}</p>
                        <p className="text-xs text-gray-500 mt-1">{rankTitle}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                <Zap size={20} className="text-purple-600" />
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total XP</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{gamification.xp}</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Activity size={20} className="text-blue-600" />
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Projects</p>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{activeProjectsDetails.length}</p>
                    </div>
                </div>
            </section>

            {/* XP Progress Bar */}
            <section className="max-w-7xl mx-auto px-6 mt-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-orange-500" />
                            <span className="text-sm font-semibold text-gray-700">Level {gamification.level} → Level {gamification.level + 1}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{xpToNext} XP to go</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.max(gamification.progress, 2)}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>{gamification.xpIntoLevel} XP</span>
                        <span>{gamification.xpRequiredForNextLevel} XP</span>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Active Projects */}
                    <div className="md:col-span-2 space-y-5">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Activity className="text-emerald-500" size={22} /> Active Projects
                        </h2>

                        <div className="space-y-3">
                            {activeProjectsDetails.length > 0 ? (
                                activeProjectsDetails.map(({ project, tech, pathId, completed }, idx) => {
                                    const total = project.tasks.length;
                                    const percent = Math.round((completed / total) * 100);

                                    return (
                                        <Link key={project.id} href={`/paths/${pathId}/${project.id}`}>
                                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className={`px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${tech.color} text-white`}>
                                                                {tech.title}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {completed}/{total} tasks
                                                            </span>
                                                        </div>
                                                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                                        <span className="text-sm font-bold text-gray-700">{percent}%</span>
                                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                                                    </div>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="bg-white rounded-xl p-10 text-center border border-gray-100 shadow-sm">
                                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Target size={28} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 mb-2">No active projects yet</p>
                                    <Link href="/paths" className="text-emerald-600 font-semibold text-sm hover:underline">
                                        Start your first project →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* AI Coach */}
                        <div className="bg-gray-900 rounded-xl p-5 text-white">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold flex items-center gap-2 text-sm">
                                    <Zap size={16} className="text-yellow-400" /> AI Coach
                                </h3>
                                {isGeneratingTip && <Loader2 size={14} className="animate-spin text-gray-500" />}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                {dailyTip || "Analyzing your progress..."}
                            </p>
                            <button
                                onClick={generateAITip}
                                disabled={isGeneratingTip}
                                className="mt-4 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors disabled:opacity-50"
                            >
                                Get new tip →
                            </button>
                        </div>

                        {/* Bookmarks */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Bookmark className="text-teal-500" size={20} /> Saved Projects
                            </h2>

                            <div className="space-y-2">
                                {bookmarkedProjectsDetails.length > 0 ? (
                                    bookmarkedProjectsDetails.map(({ project, pathId }) => (
                                        <Link key={project.id} href={`/paths/${pathId}/${project.id}`}>
                                            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all group">
                                                <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 text-sm mb-1.5 line-clamp-2">
                                                    {project.title}
                                                </h4>
                                                <div className="flex items-center justify-between text-xs text-gray-400">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {project.duration}</span>
                                                    <span className="capitalize">{project.difficulty}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm">
                                        <Bookmark size={20} className="mx-auto mb-2 text-gray-300" />
                                        <p className="text-xs text-gray-400">Bookmark projects to save them here</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                <BookOpen size={16} className="text-emerald-600" /> Quick Links
                            </h3>
                            <div className="space-y-2">
                                <Link href="/paths" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 transition-colors py-1.5">
                                    <span>Browse all paths</span>
                                    <ArrowRight size={14} />
                                </Link>
                                <Link href="/about" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 transition-colors py-1.5">
                                    <span>About raxlearn</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
