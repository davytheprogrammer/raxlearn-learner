'use client';

import { useState } from 'react';
import { Bot, Target, ShieldCheck, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '@/lib/learning-data-expanded';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface InlineProjectAdvisorProps {
    project: Project;
    techName: string;
    totalUserTasksCompleted: number;
}

export default function InlineProjectAdvisor({ project, techName, totalUserTasksCompleted }: InlineProjectAdvisorProps) {
    const [activeTab, setActiveTab] = useState<'strategy' | 'prep' | 'confidence' | null>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchAIResponse = async (type: 'strategy' | 'prep' | 'confidence') => {
        setActiveTab(type);
        setIsLoading(true);
        setContent('');

        let prompt = '';
        if (type === 'strategy') {
            prompt = 'Provide a high-level architectural execution strategy for this project. How should I approach building it from start to finish?';
        } else if (type === 'prep') {
            prompt = 'What exact mental models, concepts, or prerequisite knowledge should I brush up on before starting this specific project?';
        } else {
            prompt = `I have completed ${totalUserTasksCompleted} total tasks on this platform so far. Based on that and the fact that this is a "${project.difficulty}" project, give me a highly personalized pep talk and assess my readiness.`;
        }

        const context = `Project Advisor Context:
Project: "${project.title}"
Difficulty: ${project.difficulty}
Tech Stack: ${project.technologies?.join(', ')} (${techName})
Description: ${project.description}
Total Tasks in Project: ${project.tasks?.length}
Outcomes: ${project.learningOutcomes?.join(', ')}`;

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }],
                    context
                })
            });
            const data = await res.json();
            setContent(data.content);
        } catch (e) {
            setContent('Failed to generate insights. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-glass overflow-hidden border border-teal-200 mt-8">
            <div className="bg-gradient-to-r from-teal-600 to-pink-600 p-5 flex items-start gap-4 text-white">
                <div className="bg-white/20 p-2 rounded-xl mt-1">
                    <Bot size={28} />
                </div>
                <div>
                    <h3 className="font-bold text-xl flex items-center gap-2">Project Strategist AI <Sparkles size={16} className="text-yellow-300" /></h3>
                    <p className="text-sm opacity-90 mt-1 max-w-xl">
                        Before writing a single line of code, let's architect the mental map of how we are going to conquer this {techName} application.
                    </p>
                </div>
            </div>

            <div className="p-4 bg-white/50 border-b border-gray-100 flex flex-wrap gap-3">
                <button
                    onClick={() => fetchAIResponse('strategy')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'strategy' ? 'bg-teal-100 text-teal-700 shadow-sm ring-1 ring-teal-300' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
                >
                    <Target size={18} /> Execution Strategy
                </button>
                <button
                    onClick={() => fetchAIResponse('prep')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'prep' ? 'bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-300' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
                >
                    <AlertCircle size={18} /> Pre-Flight Checklist
                </button>
                <button
                    onClick={() => fetchAIResponse('confidence')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${activeTab === 'confidence' ? 'bg-green-100 text-green-700 shadow-sm ring-1 ring-green-300' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
                >
                    <ShieldCheck size={18} /> Readiness Assessment
                </button>
            </div>

            {(isLoading || content) && (
                <div className="p-8 bg-white/80 min-h-[150px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                            <Loader2 className="animate-spin mb-4 text-teal-600" size={36} />
                            <p className="text-sm font-medium animate-pulse text-teal-800">Compiling precise architectural blueprints...</p>
                        </div>
                    ) : (
                        <div className="markdown-body text-base max-w-4xl">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
