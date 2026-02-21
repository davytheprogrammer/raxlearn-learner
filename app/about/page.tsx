'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { Language, languages } from '@/lib/i18n';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const { t, lang, setLang } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

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

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/community.jpg"
            alt="raxlearn Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            About raxlearn
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed font-medium">
            Empowering the next generation of developers through project-based, practical education.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-24 md:py-32 bg-white/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 animate-slideInLeft">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              We're on a mission to democratize programming education. Every developer should have the opportunity to learn, grow, and build amazing products regardless of their background or location.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Quality education for all',
                'Hands-on project focus',
                'Global community support',
                'Always evolving content',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 glass rounded-xl border-white/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg">✓</div>
                  <span className="text-gray-700 font-bold text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group animate-slideInRight">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-pink-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
            <img
              src="/images/mission.jpg"
              alt="Global learning community"
              className="relative w-full rounded-2xl shadow-2xl object-cover h-[450px] border-4 border-white/50"
            />
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="px-6 py-24 md:py-32 bg-gradient-to-br from-slate-50 to-emerald-50/30 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />
            <img
              src="/images/success-stories.jpg"
              alt="Developer Success"
              className="relative w-full rounded-2xl shadow-2xl object-cover h-[450px] border-4 border-white/50"
            />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Built for Your Success</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Our curriculum is designed to take you from fundamentals to advanced concepts through building real products. 89% of our early learners report feeling confident in their skills after completing a path.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="card-glass p-6 text-center">
                <p className="text-4xl font-bold text-emerald-600 mb-2">89%</p>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Completion Rate</p>
              </div>
              <div className="card-glass p-6 text-center">
                <p className="text-4xl font-bold text-teal-600 mb-2">4.9/5</p>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Student Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">What drives everything we do at raxlearn</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Learn by Building',
                desc: 'Theory without practice is incomplete. We emphasize hands-on projects that teach real-world skills.',
                icon: '🔨',
                image: '/images/web-development.jpg'
              },
              {
                title: 'Community First',
                desc: 'Learning is better together. We foster a supportive community where developers help each other grow.',
                icon: '🤝',
                image: '/images/testimonials.jpg'
              },
              {
                title: 'Always Evolving',
                desc: 'Technology changes fast. We continuously update content to reflect the latest tools and best practices.',
                icon: '⚡',
                image: '/images/backend-development.jpg'
              },
            ].map((value, i) => (
              <div key={i} className="group card-glass overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="h-48 relative overflow-hidden">
                  <img src={value.image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt={value.title} />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 text-4xl">{value.icon}</div>
                </div>
                <div className="p-8 space-y-4 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-20 md:py-32 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '150K+', label: 'Active Learners' },
            { number: '11', label: 'Skill Paths' },
            { number: '800+', label: 'Projects' },
            { number: '4.8/5', label: 'Average Rating' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold">{stat.number}</p>
              <p className="text-lg opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto card-glass p-12 md:p-16 space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Join Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start learning today and become part of a global community of developers building amazing products
          </p>
          <Link
            href="/paths"
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Explore Learning Paths →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
