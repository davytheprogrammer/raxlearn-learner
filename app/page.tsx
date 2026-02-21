'use client';

import Link from 'next/link';
import { skillPaths } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRight, Star, Users, BookOpen, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';

export default function HomePage() {
  const { t, lang, setLang } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const featuredPaths = skillPaths.slice(0, 6);

  const stats = [
    { icon: Users, label: t('stats.students'), value: '670+' },
    { icon: BookOpen, label: t('stats.projects'), value: '45+' },
    { icon: TrendingUp, label: t('stats.paths'), value: '11' },
    { icon: Star, label: t('stats.completion'), value: '89%' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            raxlearn
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/paths" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.paths')}
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Dashboard
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

            <Link
              href="/paths"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/learning-hero.jpg"
            alt="Learning journey with diverse students"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center py-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4"
            >
              <p className="text-sm font-semibold text-emerald-100 uppercase tracking-widest">
                🚀 Project-Based Learning Platform
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white leading-tight drop-shadow-2xl"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-emerald-50 leading-relaxed font-medium max-w-3xl mx-auto text-shadow-md"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <Link
                href="/paths"
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group border border-emerald-400/30"
              >
                {t('hero.cta')} <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-md font-bold text-white text-lg hover:bg-white/20 border border-white/20 transition-all shadow-xl"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Stats inside hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
                <p className="text-white/70 text-xs font-medium mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Paths Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">{t('featured.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('featured.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPaths.map((path, idx) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <Link href={`/paths/${path.id}`} className="block h-full">
                  <div className="group card-glass h-full overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      {path.image ? (
                        <img
                          src={path.image}
                          alt={path.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${path.color} flex items-center justify-center text-6xl opacity-80`}>
                          {path.icon}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {path.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${path.color} whitespace-nowrap flex-shrink-0`}>
                          {path.difficulty}
                        </div>
                      </div>

                      <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed flex-1">{path.description}</p>

                      <div className="space-y-3 pt-2 border-t border-white/30">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users size={16} />
                            <span>{path.students} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-900">{path.rating}</span>
                          </div>
                        </div>

                        <button className="w-full py-3 rounded-lg bg-emerald-50 text-emerald-600 font-semibold hover:bg-emerald-100 transition-colors group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white">
                          Explore Path →
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/paths"
              className="inline-block px-8 py-4 rounded-xl glass font-bold text-gray-700 hover:bg-white/80 transition-all group"
            >
              {t('featured.explore')} <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-white/20 to-white/40">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">How Project-Based Learning Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">No lectures, no quizzes — just real coding. Here's how you'll learn.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Pick a Path', desc: 'Choose from 11 specializations like React, Python, DevOps, and more' },
              { step: 2, title: 'Choose Your Tech', desc: 'Select the specific framework or language you want to master' },
              { step: 3, title: 'Build Projects', desc: 'Work through guided, real-world projects — task by task' },
              { step: 4, title: 'Ship & Level Up', desc: 'Complete projects, earn XP, and build a portfolio you can show off' },
            ].map((item) => (
              <div key={item.step} className="card-glass p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cta-banner.jpg"
            alt="Start your journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl mx-auto card-glass p-12 md:p-16 space-y-8 text-center relative z-10 shadow-2xl border-white/50">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Ready to Build Something?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Stop watching tutorials. Start building real projects and learn by doing.
          </p>
          <Link
            href="/paths"
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Browse Learning Paths →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
