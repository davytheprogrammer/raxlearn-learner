'use client';

import { useState } from 'react';
import { Bot, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { TechOption } from '@/lib/learning-data-expanded';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface InlineTechComparatorProps {
    techOptions: TechOption[];
}

export default function InlineTechComparator({ techOptions }: InlineTechComparatorProps) {
    const [goal, setGoal] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!goal.trim()) return;

        setIsLoading(true);
        setContent('');

        const context = `Tech Selection Options Data:
${techOptions.map(t => `- ${t.title}: ${t.description} (Duration: ${t.duration}, Projects: ${t.projects})`).join('\n')}

Instruction:
The user is going to state their career or project goal.
Analyze their goal strictly against the provided "Tech Selection Options Data".
Rank the top 1 or 2 options that fit perfectly, explain why, and tell them which path to choose. Be decisive and highly encouraging as a senior engineer. Use short, punchy paragraphs.`;

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: goal }],
                    context
                })
            });
            const data = await res.json();
            setContent(data.content);
        } catch (e) {
            setContent('Failed to generate insights. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-glass overflow-hidden border border-emerald-200 mb-12 shadow-md">
            <div className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-teal-600 p-6 text-white flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse mix-blend-overlay"></div>
                    <Bot size={40} className="relative z-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-2xl flex items-center justify-center md:justify-start gap-2">
                        AI Technology Matchmaker <Sparkles size={20} className="text-yellow-300" />
                    </h3>
                    <p className="text-sm opacity-90 mt-2 max-w-2xl leading-relaxed">
                        Not sure which stack to pick? Tell me your career goals, what kind of apps you want to build, or your timeline, and I'll analyze the engineering trade-offs to pick the perfect option for you.
                    </p>
                </div>
            </div>

            <div className="p-6 bg-white/80">
                <form onSubmit={handleAnalyze} className="relative max-w-3xl mx-auto">
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g., 'I want to build rapid SaaS products' or 'I want to work at Netflix'"
                        className="w-full px-6 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-800 pr-36"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !goal.trim()}
                        className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Analyze'}
                    </button>
                </form>

                {(isLoading || content) && (
                    <div className="mt-8 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center text-gray-500 py-4">
                                <Loader2 className="animate-spin mb-4 text-indigo-600" size={32} />
                                <p className="text-sm font-medium animate-pulse text-indigo-800">Evaluating stack topologies against your goals...</p>
                            </div>
                        ) : (
                            <div className="markdown-body text-sm bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                    {content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
