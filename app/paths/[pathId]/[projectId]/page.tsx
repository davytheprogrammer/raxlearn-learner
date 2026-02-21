'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { skillPaths, Project } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRight, Globe, ArrowLeft, Clock, BookOpen, Users, Star, Target, Zap, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language, languages } from '@/lib/i18n';
import { useUserProgress } from '@/hooks/use-user-progress';
import InlineProjectAdvisor from '@/components/InlineProjectAdvisor';
import Footer from '@/components/Footer';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.pathId as string;
  const projectId = params.projectId as string;
  const { t, lang, setLang } = useLanguage();
  const { getTotalTasksCompleted } = useUserProgress();
  const [showLanguages, setShowLanguages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const path = skillPaths.find((p) => p.id === pathId);
  let project: Project | null = null;
  let currentTechOption: any = null;

  if (path?.techOptions) {
    for (const tech of path.techOptions) {
      const found = tech.projects?.find((pr: Project) => pr.id === projectId);
      if (found) {
        project = found;
        currentTechOption = tech;
        break;
      }
    }
  }

  const techProjects = currentTechOption?.projects || [];
  const projectIndex = techProjects.findIndex((pr: Project) => pr.id === projectId);

  const nextProject = projectIndex > -1 && projectIndex < techProjects.length - 1 ? techProjects[projectIndex + 1] : null;
  const prevProject = projectIndex > 0 ? techProjects[projectIndex - 1] : null;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!path || !project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              raxlearn
            </Link>
            <button onClick={() => router.back()} className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold">
              Go Back
            </button>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center space-y-6 max-w-lg">
            <div className="text-6xl">404</div>
            <h1 className="text-3xl font-bold text-gray-900">Project not found</h1>
            <p className="text-lg text-gray-600">The project you're looking for doesn't exist or has been moved.</p>
            <div className="flex gap-4 justify-center">
              <Link href={`/paths/${pathId}`} className="px-6 py-3 rounded-lg glass font-semibold hover:bg-white/80">
                Back to Path
              </Link>
              <Link href="/paths" className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600">
                Browse Paths
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

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

            <Link href={`/paths/${pathId}`} className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Back to Path
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <section className="px-6 py-4 border-b border-white/30 bg-white/20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm flex-wrap">
          <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href="/paths" className="text-gray-700 hover:text-emerald-600 transition">Paths</Link>
          <span className="text-gray-500">/</span>
          <Link href={`/paths/${pathId}`} className="text-gray-700 hover:text-emerald-600 transition truncate">{path.title}</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-semibold truncate">{project.title}</span>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-6 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image || path.image || '/images/projects-showcase.jpg'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-white space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-white/15 text-sm font-semibold backdrop-blur-sm border border-white/20">
              Project {projectIndex + 1} of {techProjects.length}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">{project.title}</h1>
            <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Duration</p>
              <p className="text-xl font-bold">{project.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Tasks</p>
              <p className="text-xl font-bold">{project.tasks.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Difficulty</p>
              <p className="text-xl font-bold capitalize">{project.difficulty}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1">Learners</p>
              <p className="text-xl font-bold">{path.students}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Left Column - Learning Outcomes & Overview */}
          <div className="md:col-span-2 space-y-12">

            <InlineProjectAdvisor
              project={project}
              techName={currentTechOption?.title || 'Unknown Tech'}
              totalUserTasksCompleted={getTotalTasksCompleted()}
            />
            {/* Learning Outcomes */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Lightbulb className="text-emerald-500" size={28} />
                  What You'll Learn
                </h2>
                <p className="text-gray-600">By completing this project, you'll master these essential skills and concepts.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.learningOutcomes?.slice(0, 6).map((outcome: string, i: number) => (
                  <div key={i} className="card-glass p-4 flex gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700 font-medium">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Zap className="text-yellow-500" size={28} />
                  Technologies & Tools
                </h2>
                <p className="text-gray-600">You'll work with these modern technologies and frameworks.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string) => (
                  <div key={tech} className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-gray-900 font-semibold border border-emerald-200">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Overview */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Target className="text-red-500" size={28} />
                  Project Tasks
                </h2>
                <p className="text-gray-600">Complete these tasks to build the full project.</p>
              </div>
              <div className="space-y-4">
                {project.tasks.map((task: any, index: number) => (
                  <Link key={task.id} href={`/paths/${pathId}/${projectId}/tasks/${task.id}`}>
                    <div className="card-glass p-6 hover:shadow-lg transition group cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition truncate">
                              {task.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{task.description}</p>
                          </div>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium capitalize">
                          {task.difficulty}
                        </span>
                        <span className="text-gray-600 flex items-center gap-1">
                          <Clock size={16} /> {task.duration}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Project Info Card */}
            <div className="card-glass p-8 space-y-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900">Project Information</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold uppercase">Skill Path</p>
                  <Link href={`/paths/${pathId}`} className="text-emerald-600 hover:text-emerald-700 font-semibold mt-1">
                    {path.title} →
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase">Estimated Time</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{project.duration}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase">Difficulty Level</p>
                  <p className={`text-lg font-bold mt-1 capitalize ${project.difficulty === 'beginner' ? 'text-green-600' :
                    project.difficulty === 'intermediate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                    {project.difficulty}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase">Rating</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">5.0</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 font-semibold uppercase">Learners</p>
                  <p className="text-lg font-bold text-gray-900 mt-1 flex items-center gap-2">
                    <Users size={20} /> {path.students}
                  </p>
                </div>
              </div>

              <button className="w-full py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:shadow-lg hover:scale-105 transition-all">
                Start This Project
              </button>
            </div>

            {/* Prerequisites Card */}
            {(() => {
              const allPrerequisites = Array.from(new Set(project.tasks.flatMap(t => t.prerequisites || [])));
              if (allPrerequisites.length === 0) return null;
              return (
                <div className="card-glass p-6 space-y-4">
                  <h4 className="font-bold text-gray-900">Prerequisites</h4>
                  <ul className="space-y-2">
                    {allPrerequisites.map((prereq: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-emerald-500 font-bold mt-1">✓</span>
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {/* Navigation */}
            {(prevProject || nextProject) && (
              <div className="space-y-3">
                {prevProject && (
                  <Link href={`/paths/${pathId}/${prevProject.id}`}>
                    <div className="card-glass p-4 hover:shadow-lg transition group">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Previous Project</p>
                      <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition mt-1 flex items-center gap-2">
                        <ArrowLeft size={16} /> {prevProject.title}
                      </p>
                    </div>
                  </Link>
                )}
                {nextProject && (
                  <Link href={`/paths/${pathId}/${nextProject.id}`}>
                    <div className="card-glass p-4 hover:shadow-lg transition group">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Next Project</p>
                      <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition mt-1 flex items-center gap-2">
                        {nextProject.title} <ArrowRight size={16} />
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-white/20 to-white/40">
        <div className="max-w-4xl mx-auto card-glass p-12 md:p-16 space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">Ready to Build?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start with the first task and build your skills step by step. Each task builds upon the previous one.
          </p>
          <Link
            href={`/paths/${pathId}/${projectId}/tasks/${project.tasks[0]?.id}`}
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Start Task 1: {project.tasks[0]?.title} →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
