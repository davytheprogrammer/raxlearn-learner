'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';
import { skillPaths } from '@/lib/learning-data-expanded';
import { useParams } from 'next/navigation';
import InlineTechComparator from '@/components/InlineTechComparator';
import Footer from '@/components/Footer';

export default function TechSelectionPage() {
  const params = useParams();
  const pathId = params.pathId as string;
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

  const techOptions = path.techOptions || [];

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
            <Link href={`/paths/${pathId}`} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Back to {path.title}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/50 transition-colors"
              >
                <LucideIcons.Globe size={18} />
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

            <Link href={`/paths/${pathId}`} className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Back to Path
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {path.image ? (
            <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-700 to-teal-700" />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-block px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-emerald-100 font-semibold text-sm border border-white/20">
              {path.title}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">Choose Your Tech Stack</h1>
            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
              Select the specific technology you want to master in this path. Each option includes curated projects and tailored learning resources.
            </p>
          </div>

          <InlineTechComparator techOptions={techOptions} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techOptions.map((tech, index) => {
              const IconComponent = (LucideIcons as any)[tech.iconName] || LucideIcons.Code;
              return (
                <Link
                  key={tech.id}
                  href={`/paths/${pathId}/projects?tech=${tech.id}`}
                  className="group"
                >
                  <div className="card-glass h-full overflow-hidden cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-slideUp" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${tech.color}`}>
                      <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-90 group-hover:scale-110 transition-transform duration-300 text-white">
                        <IconComponent size={32} />
                      </div>
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {tech.title}
                      </h3>

                      <p className="text-gray-600 line-clamp-2 flex-1">
                        {tech.description}
                      </p>

                      <div className="space-y-3 pt-2 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-600">
                            <span className="font-semibold">Duration:</span> {tech.duration}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-semibold">Projects:</span> {tech.projects?.length || 0}
                          </div>
                        </div>

                        <button className="w-full py-3 rounded-lg bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100 transition-colors group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white flex items-center justify-center gap-2">
                          Start Learning <LucideIcons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
