'use client';

import Link from 'next/link';
import { skillPaths } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRight, Globe, Code } from 'lucide-react';
import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';
import { useSearchParams, useParams } from 'next/navigation';
import Footer from '@/components/Footer';

export default function TechSpecificProjectsPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const pathId = params.pathId as string;
    const techParam = searchParams.get('tech');

    const { t, lang, setLang } = useLanguage();
    const [showLanguages, setShowLanguages] = useState(false);

    const path = skillPaths.find(p => p.id === pathId);

    if (!path) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
                <div className="flex items-center justify-center min-h-[60vh] mx-auto max-w-7xl px-4">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-bold text-gray-900">Path not found</h1>
                        <p className="text-gray-600">The learning path you're looking for doesn't exist.</p>
                        <Link href="/paths" className="inline-block px-6 py-3 rounded-lg glass font-semibold hover:bg-white/80">
                            Back to all paths →
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const selectedTech = path.techOptions?.find(t => t.id === techParam);

    const filteredProjects = selectedTech?.projects || [];
    const techName = selectedTech ? selectedTech.title : path.title;
    const totalTasks = filteredProjects.reduce((sum, p) => sum + p.tasks.length, 0);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        raxlearn
                    </Link>

                    <div className="hidden md:flex gap-8 items-center">
                        <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            {t('nav.home')}
                        </Link>
                        <Link href="/paths" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            {t('nav.paths')}
                        </Link>
                        <Link href={`/paths/${pathId}/select-tech`} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                            Change Tech
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowLanguages(!showLanguages)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/50 transition-colors"
                            >
                                <Globe size={18} />
                                <span className="text-sm font-medium text-gray-700">{lang.toUpperCase()}</span>
                            </button>

                            {showLanguages && (
                                <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg py-2 z-50">
                                    {Object.entries(languages).map(([code, name]) => (
                                        <button
                                            key={code}
                                            onClick={() => {
                                                setLang(code as Language);
                                                setShowLanguages(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${lang === code ? 'bg-emerald-100 text-emerald-600 font-semibold' : 'text-gray-700'
                                                }`}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href={`/paths/${pathId}/select-tech`} className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
                            Change Tech
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative px-6 py-14 md:py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={path.image || '/images/projects-showcase.jpg'} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="max-w-7xl mx-auto text-white relative z-10 space-y-8">
                    <div className="max-w-3xl space-y-5">
                        <div className="inline-flex items-center gap-2 text-2xl">
                            <Code size={28} />
                            <span className="font-semibold">{techName}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                            {techName} Mastery Path
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
                            Curated projects specifically designed for mastering {techName}. Build real-world applications and gain practical experience.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {filteredProjects[0] && (
                                <Link href={`/paths/${pathId}/${filteredProjects[0].id}`} className="px-8 py-3 rounded-xl bg-white text-emerald-700 font-bold hover:shadow-xl hover:scale-105 transition-all">
                                    Start Learning Now
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Duration</p>
                            <p className="text-2xl font-bold">{selectedTech?.duration || path.duration}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Projects</p>
                            <p className="text-2xl font-bold">{filteredProjects.length}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Tasks</p>
                            <p className="text-2xl font-bold">{totalTasks}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
                            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Learners</p>
                            <p className="text-2xl font-bold">{path.students}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="px-6 py-24">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">
                            {techName} Projects Curriculum
                        </h2>
                        <p className="text-lg text-gray-600">
                            Build real-world applications and master practical skills through these {techName}-focused projects
                        </p>
                    </div>

                    <div className="space-y-6">
                        {filteredProjects.map((project, index) => (
                            <Link key={project.id} href={`/paths/${pathId}/${project.id}`}>
                                <div className="card-glass p-8 space-y-6 group cursor-pointer transform hover:scale-102 hover:shadow-2xl transition-all duration-300 border-l-4 border-transparent hover:border-emerald-500 animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-6 flex-1">
                                            {project.image ? (
                                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all flex-shrink-0 relative hidden sm:block">
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur shadow-sm text-emerald-600 flex items-center justify-center font-black text-sm">{index + 1}</div>
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform hidden sm:flex">
                                                    {index + 1}
                                                </div>
                                            )}

                                            <div className="space-y-3 flex-1 pt-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="sm:hidden w-8 h-8 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed">{project.description}</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={24} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Technologies</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <span key={tech} className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                                                        +{project.technologies.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Duration</p>
                                            <p className="text-gray-900 font-semibold">{project.duration}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Tasks</p>
                                            <p className="text-gray-900 font-semibold">{project.tasks.length} tasks</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No projects found for the selected technology filter.</p>
                                <Link href={`/paths/${pathId}/select-tech`} className="inline-block mt-4 px-6 py-3 rounded-lg glass font-semibold hover:bg-white/80">
                                    Change Technology →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto card-glass p-12 md:p-16 space-y-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">
                        Ready to Master {techName}?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Start with the first project today and join our growing community of developers building amazing products
                    </p>
                    {filteredProjects[0] && (
                        <Link
                            href={`/paths/${pathId}/${filteredProjects[0].id}`}
                            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Start First Project →
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
