'use client';

import { useState } from 'react';
import { Bot, Lightbulb, AlertTriangle, ListChecks, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface InlineTaskMentorProps {
    taskTitle: string;
    taskDescription: string;
    techName: string;
    starterCode?: string;
    learningOutcomes?: string[];
}

export default function InlineTaskMentor({ taskTitle, taskDescription, techName, starterCode, learningOutcomes }: InlineTaskMentorProps) {
    const [activeTab, setActiveTab] = useState<'explain' | 'pitfalls' | 'breakdown' | null>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchAIResponse = async (type: 'explain' | 'pitfalls' | 'breakdown') => {
        setActiveTab(type);
        setIsLoading(true);
        setContent('');

        let prompt = '';
        if (type === 'explain') {
            prompt = 'Please explain the core concepts behind this task simply, as if to a junior developer. Do not give away the exact code solution.';
        } else if (type === 'pitfalls') {
            prompt = 'What are the most common mistakes or pitfalls students make when trying to implement this specific task?';
        } else {
            prompt = 'Break this task down into 3-4 smaller, manageable steps I can follow without giving me the exact code.';
        }

        const context = `Task Mentoring Context:
Task: "${taskTitle}"
Tech Stack: ${techName}
Description: ${taskDescription}
Outcomes: ${learningOutcomes?.join(', ')}
${starterCode ? `Starter Code: ${starterCode}` : ''}`;

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
        <div className="card-glass overflow-hidden border border-emerald-200 mt-8">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center gap-3 text-white">
                <Bot size={24} />
                <div>
                    <h3 className="font-bold text-lg">AI Task Mentor</h3>
                    <p className="text-sm opacity-90">Deeply integrated analysis for this specific step</p>
                </div>
            </div>

            <div className="p-4 bg-white/50 border-b border-gray-100 flex flex-wrap gap-2">
                <button
                    onClick={() => fetchAIResponse('explain')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'explain' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <Lightbulb size={16} /> Explain Concept
                </button>
                <button
                    onClick={() => fetchAIResponse('pitfalls')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'pitfalls' ? 'bg-orange-100 text-orange-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <AlertTriangle size={16} /> Common Pitfalls
                </button>
                <button
                    onClick={() => fetchAIResponse('breakdown')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === 'breakdown' ? 'bg-teal-100 text-teal-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <ListChecks size={16} /> Step-by-Step Breakdown
                </button>
            </div>

            {(isLoading || content) && (
                <div className="p-6 bg-white/80 min-h-[150px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
                            <Loader2 className="animate-spin mb-4" size={32} />
                            <p className="text-sm font-medium animate-pulse">Analyzing task architecture...</p>
                        </div>
                    ) : (
                        <div className="markdown-body text-sm">
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
