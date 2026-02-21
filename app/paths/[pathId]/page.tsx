'use client';

import Link from 'next/link';
import { skillPaths } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRight, Users, Star, Clock, BookOpen, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language, languages } from '@/lib/i18n';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';

export default function PathDetailPage() {
  const params = useParams();
  const pathId = params.pathId as string;
  const { t, lang, setLang } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const path = skillPaths.find((p) => p.id === pathId);

  if (!path) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              raxlearn
            </Link>
            <Link href="/paths" className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold">
              Back to Paths
            </Link>
          </div>
        </nav>
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

  const totalProjects = path.techOptions?.reduce((sum, tech) => sum + (tech.projects?.length || 0), 0) || 0;
  const totalTasks = path.techOptions?.reduce((sum, tech) => sum + (tech.projects?.reduce((tSum, p) => tSum + p.tasks.length, 0) || 0), 0) || 0;

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

            <Link href="/paths" className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              {t('nav.paths')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-14 md:py-20 overflow-hidden">
        {/* Full background image */}
        <div className="absolute inset-0 z-0">
          {path.image ? (
            <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${path.color}`} />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-7xl mx-auto text-white relative z-10 space-y-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-block text-5xl">{path.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">{path.title}</h1>
            <p className="text-lg text-gray-200 leading-relaxed max-w-xl">{path.description}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              {path.techOptions && path.techOptions.length > 0 ? (
                <>
                  <Link href={`/paths/${pathId}/select-tech`} className="px-8 py-3 rounded-xl bg-white text-emerald-700 font-bold hover:shadow-xl hover:scale-105 transition-all">
                    Choose Your Tech Stack
                  </Link>
                  <Link href={`/paths/${pathId}/select-tech`} className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2">
                    <ArrowRight size={18} /> Explore Technologies
                  </Link>
                </>
              ) : (
                <Link href={`/paths/${pathId}/select-tech`} className="px-8 py-3 rounded-xl bg-white text-emerald-700 font-bold hover:shadow-xl hover:scale-105 transition-all">
                  Start Learning Now
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Duration</p>
              <p className="text-2xl font-bold">{path.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Projects</p>
              <p className="text-2xl font-bold">{totalProjects}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">{t('pathDetails.curriculum')}</h2>
            <p className="text-lg text-gray-600">Build real-world applications and master practical skills through these projects</p>
          </div>

          <div className="space-y-6">
            {path.techOptions && path.techOptions.length > 0 ? (
              // Special section for paths with tech options
              <div className="text-center py-16">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-6xl">{path.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900">Choose Your Technology Focus</h3>
                  <p className="text-lg text-gray-600">
                    Instead of browsing all projects at once, select the specific technology you want to master.
                    We'll curate the perfect learning path just for you.
                  </p>
                  <Link
                    href={`/paths/${pathId}/select-tech`}
                    className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Select Technology →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto card-glass p-12 md:p-16 space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Ready to Master {path.title}?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start with the first project today and join our growing community of developers building amazing products
          </p>
          {path.techOptions && path.techOptions.length > 0 ? (
            <Link
              href={`/paths/${pathId}/select-tech`}
              className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Choose Your Tech Stack →
            </Link>
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
