'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { skillPaths, Project } from '@/lib/learning-data-expanded';
import { useLanguage } from '@/hooks/use-language';
import { useUserProgress } from '@/hooks/use-user-progress';
import { ArrowRight, Globe, ArrowLeft, Clock, BookOpen, CheckCircle2, Code2, FileText, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language, languages } from '@/lib/i18n';
import InlineTaskMentor from '@/components/InlineTaskMentor';
import confetti from 'canvas-confetti';
import Footer from '@/components/Footer';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.pathId as string;
  const projectId = params.projectId as string;
  const taskId = params.taskId as string;
  const { t, lang, setLang } = useLanguage();
  const { completeTask, isTaskComplete } = useUserProgress();
  const [showLanguages, setShowLanguages] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const path = skillPaths.find((p) => p.id === pathId);
  let project: Project | null = null;
  let currentTech: any = null;

  if (path?.techOptions) {
    for (const tech of path.techOptions) {
      const found = tech.projects?.find((pr: Project) => pr.id === projectId);
      if (found) {
        project = found;
        currentTech = tech;
        break;
      }
    }
  }

  const task = project?.tasks.find((t: any) => t.id === taskId);
  const taskIndex = project?.tasks.findIndex((t: any) => t.id === taskId) ?? -1;
  const nextTask = taskIndex < (project?.tasks.length ?? 0) - 1 ? project?.tasks[taskIndex + 1] : null;
  const prevTask = taskIndex > 0 ? project?.tasks[taskIndex - 1] : null;

  useEffect(() => {
    setIsLoading(false);
    setIsTaskCompleted(isTaskComplete(taskId));
  }, [taskId]);

  const handleCompleteTask = () => {
    completeTask(pathId, projectId, taskId);
    setIsTaskCompleted(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
    });
  };

  if (!path || !project || !task) {
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
            <h1 className="text-3xl font-bold text-gray-900">Task not found</h1>
            <p className="text-lg text-gray-600">The task you're looking for doesn't exist or has been moved.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href={`/paths/${pathId}/${projectId}`} className="px-6 py-3 rounded-lg glass font-semibold hover:bg-white/80">
                Back to Project
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

            <Link href={`/paths/${pathId}/${projectId}`} className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Back to Project
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
          <Link href={`/paths/${pathId}/${projectId}`} className="text-gray-700 hover:text-emerald-600 transition truncate">{project.title}</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 font-semibold truncate">{task.title}</span>
        </div>
      </section>

      {/* Completion Status Banner */}
      {isTaskCompleted && (
        <div className="px-6 py-4 bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={24} />
            <div>
              <p className="font-bold text-green-900">Task Completed!</p>
              <p className="text-sm text-green-700">Great work! You've completed this task.</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={path.image || '/images/projects-showcase.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-white space-y-6">
          <div className="space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-emerald-100 text-sm font-semibold backdrop-blur-sm border border-white/20">
              Task {taskIndex + 1} of {project.tasks.length}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">{task.title}</h1>
            <p className="text-base text-gray-200 max-w-2xl leading-relaxed">{task.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-0.5">Duration</p>
              <p className="text-base font-bold flex items-center gap-1.5"><Clock size={14} /> {task.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-0.5">Difficulty</p>
              <p className="text-base font-bold capitalize">{task.difficulty}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
              <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-0.5">Status</p>
              <p className={`text-base font-bold ${isTaskCompleted ? 'text-green-300' : 'text-gray-200'}`}>
                {isTaskCompleted ? '✓ Done' : 'In Progress'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Task Brief */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="text-emerald-500" size={28} />
                What You'll Do
              </h2>
              <div className="card-glass p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{task.detailed_instructions || task.description}</p>

                {/* Learning Objectives for this task */}
                {task.learningOutcomes && task.learningOutcomes.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200/50 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">By completing this task, you will:</h3>
                    <ul className="space-y-3">
                      {task.learningOutcomes.map((outcome: string, i: number) => (
                        <li key={i} className="flex gap-3 items-start">
                          <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700 font-medium">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <InlineTaskMentor
                taskTitle={task.title}
                taskDescription={task.description}
                techName={currentTech?.title || 'Unknown Tech'}
                starterCode={task.starter_code}
                learningOutcomes={task.learningOutcomes}
              />
            </div>

            {/* Starter Code — only shown if actual code exists */}
            {task.starter_code && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Code2 className="text-teal-500" size={28} />
                  Starter Code
                </h2>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto shadow-xl border border-gray-800">
                  <pre className="text-gray-100 text-sm font-mono leading-relaxed">
                    <code>{task.starter_code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Approach Guide — contextual, not generic */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <AlertCircle className="text-amber-500" size={28} />
                Approach Guide
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    step: '1',
                    title: 'Read & Plan',
                    desc: `Read the full description of "${task.title}" above. Before writing any code, sketch out the architecture — list the files you'll create and the data flow between them.`,
                  },
                  {
                    step: '2',
                    title: 'Build Incrementally',
                    desc: `Break this task into smaller milestones. Get the simplest version working first, then layer on complexity. Run your code after every meaningful change.`,
                  },
                  {
                    step: '3',
                    title: 'Use the AI Mentor',
                    desc: `If you're stuck, use the raxlearn AI Mentor above. It has full context on this task and can explain concepts, review your approach, or help you debug errors.`,
                  },
                  {
                    step: '4',
                    title: 'Validate & Refine',
                    desc: `Test edge cases manually. Check the browser console for warnings. Clean up your code, add comments to non-obvious logic, and ensure it matches the requirements.`,
                  },
                ].map((item) => (
                  <div key={item.step} className="card-glass p-5 space-y-3 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources — real links, not placeholders */}
            {task.resources && task.resources.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <BookOpen className="text-emerald-500" size={28} />
                  Reference Documentation
                </h2>
                <p className="text-gray-600">These are real, external references you can use while working on this task.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {task.resources.map((url: string, i: number) => {
                    // Generate a friendly label from the URL
                    let label = 'Documentation';
                    try {
                      const hostname = new URL(url).hostname.replace('www.', '');
                      const labelMap: Record<string, string> = {
                        'react.dev': 'React Official Docs',
                        'nextjs.org': 'Next.js Documentation',
                        'vuejs.org': 'Vue.js Guide',
                        'developer.mozilla.org': 'MDN Web Docs',
                        'nodejs.org': 'Node.js Documentation',
                        'docs.docker.com': 'Docker Getting Started',
                        'docs.python.org': 'Python Documentation',
                        'prisma.io': 'Prisma ORM Docs',
                        'jestjs.io': 'Jest Testing Framework',
                        'git-scm.com': 'Git Documentation',
                        'socket.io': 'Socket.IO Docs',
                        'redux-toolkit.js.org': 'Redux Toolkit Docs',
                        'framer.com': 'Framer Motion Docs',
                        'typescriptlang.org': 'TypeScript Handbook',
                      };
                      label = labelMap[hostname] || hostname;
                    } catch { }

                    return (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-glass p-5 hover:shadow-lg hover:border-emerald-300 border border-transparent transition-all group flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                          <BookOpen size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition truncate">{label}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{url}</p>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Complete Task Card */}
            <div className="card-glass p-8 space-y-6 sticky top-24">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Progress</h3>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${(taskIndex + 1) / project.tasks.length * 100}%` }} />
                </div>
                <p className="text-sm text-gray-600 mt-2">{taskIndex + 1} of {project.tasks.length} tasks</p>
              </div>

              {!isTaskCompleted && (
                <button
                  onClick={handleCompleteTask}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Mark as Complete
                </button>
              )}

              {isTaskCompleted && (
                <div className="w-full py-4 rounded-lg bg-green-100 text-green-700 font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Completed
                </div>
              )}
            </div>

            {/* Difficulty Badge */}
            <div className="card-glass p-6 space-y-4">
              <h4 className="font-bold text-gray-900">Difficulty</h4>
              <div className={`px-4 py-3 rounded-lg text-center font-bold ${task.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                task.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
              </div>
            </div>

            {/* Prerequisites */}
            {task.prerequisites && task.prerequisites.length > 0 && (
              <div className="card-glass p-6 space-y-4">
                <h4 className="font-bold text-gray-900">Prerequisites</h4>
                <ul className="space-y-2">
                  {task.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Task Navigation */}
            {(prevTask || nextTask) && (
              <div className="space-y-3">
                {prevTask && (
                  <Link href={`/paths/${pathId}/${projectId}/tasks/${prevTask.id}`}>
                    <div className="card-glass p-4 hover:shadow-lg transition group">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Previous Task</p>
                      <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition mt-1 flex items-center gap-2 truncate">
                        <ArrowLeft size={16} /> {prevTask.title}
                      </p>
                    </div>
                  </Link>
                )}
                {nextTask && (
                  <Link href={`/paths/${pathId}/${projectId}/tasks/${nextTask.id}`}>
                    <div className="card-glass p-4 hover:shadow-lg transition group">
                      <p className="text-xs text-gray-600 font-semibold uppercase">Next Task</p>
                      <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition mt-1 flex items-center gap-2 truncate">
                        {nextTask.title} <ArrowRight size={16} />
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            )}

            {/* Back to Project */}
            <Link href={`/paths/${pathId}/${projectId}`} className="w-full">
              <div className="card-glass p-4 hover:shadow-lg transition group text-center">
                <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition">
                  Back to Project →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
