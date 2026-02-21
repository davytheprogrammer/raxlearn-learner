'use client';

import Link from 'next/link';
import { skillPaths } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRight, Users, Star, Clock, Globe } from 'lucide-react';
import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';
import Footer from '@/components/Footer';

export default function PathsPage() {
  const { t, lang, setLang } = useLanguage();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showLanguages, setShowLanguages] = useState(false);

  const filteredPaths = selectedDifficulty
    ? skillPaths.filter((path) => path.difficulty === selectedDifficulty)
    : skillPaths;

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
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.about')}
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

            <Link href="/" className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              {t('nav.home')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="relative px-6 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/projects-showcase.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{t('paths.title')}</h1>
            <p className="text-lg text-emerald-100 max-w-2xl">
              {t('paths.description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedDifficulty === null
                ? 'bg-white text-emerald-700 shadow-lg'
                : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20'
                }`}
            >
              {t('paths.allLevels')}
            </button>
            {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-6 py-3 rounded-full font-semibold transition-all capitalize ${selectedDifficulty === difficulty
                  ? 'bg-white text-emerald-700 shadow-lg'
                  : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20'
                  }`}
              >
                {t(`common.${difficulty}`)}
              </button>
            ))}
          </div>

          <div className="text-sm text-emerald-200 font-medium">
            Showing <span className="font-bold text-white">{filteredPaths.length}</span> {t('paths.paths')}
          </div>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {filteredPaths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path, idx) => (
                <Link key={path.id} href={`/paths/${path.id}`} className="group">
                  <div className="card-glass h-full overflow-hidden cursor-pointer flex flex-col transform hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-slideUp" style={{ animationDelay: `${idx * 80}ms` }}>
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-400 to-pink-400">
                      {path.image ? (
                        <img
                          src={path.image}
                          alt={path.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                          {path.icon}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {path.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${path.color} whitespace-nowrap flex-shrink-0`}>
                          {t(`common.${path.difficulty}`)}
                        </div>
                      </div>

                      <p className="text-gray-600 line-clamp-3 flex-1 leading-relaxed">
                        {path.description}
                      </p>

                      <div className="space-y-4 pt-2 border-t border-white/30">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock size={16} />
                            <span className="truncate">{path.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users size={16} />
                            <span className="truncate">{path.students} learners</span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-900">{path.rating}</span>
                          </div>
                        </div>

                        <button className="w-full py-3 rounded-lg bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100 transition-colors group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white flex items-center justify-center gap-2">
                          {t('pathDetails.startLearning')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">{t('common.loading')}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
