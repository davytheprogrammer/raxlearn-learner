'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Send, X, MessageCircle, Bot, User, Loader2 } from 'lucide-react';
import { skillPaths, Project } from '@/lib/learning-data-expanded';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function ContextualAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const getPageContext = () => {
        try {
            const parts = pathname.split('/').filter(Boolean);

            if (pathname.includes('/dashboard')) {
                return 'User Dashboard: The user is reviewing their progress, bookmarked projects, and active pipelines. Provide quick motivations, suggest reviewing completed topics, and give a highly personalized learning tip based on common architectural growth.';
            }

            if (pathname.includes('/tasks/') && parts.length >= 5) {
                const pathId = parts[1];
                const projectId = parts[2];
                const taskId = parts[4];

                const path = skillPaths.find(p => p.id === pathId);
                let project = null;
                let tech = null;

                if (path?.techOptions) {
                    for (const t of path.techOptions) {
                        const found = t.projects?.find(pr => pr.id === projectId);
                        if (found) {
                            project = found;
                            tech = t;
                            break;
                        }
                    }
                }

                const task = project?.tasks.find((t: any) => t.id === taskId);

                if (task) {
                    return `Task Mentoring Mode: The user is currently working on Task: "${task.title}".
Description: ${task.description}
Learning Outcomes: ${task.learningOutcomes?.join(', ')}
${task.starter_code ? `Starter Code Context: ${task.starter_code}` : ''}
Instructions for AI: Act as a senior engineer pair programming with the user. Do not provide outright code solutions. Focus on guiding them through the exact task listed above, explaining core concepts, and debugging their logic in the context of ${tech?.title || 'this technology'}.`;
                }
            }

            if (pathname.includes('/paths/') && parts.length === 3 && parts[2] !== 'select-tech' && parts[2] !== 'projects') {
                const pathId = parts[1];
                const projectId = parts[2];
                const path = skillPaths.find(p => p.id === pathId);

                let project = null;
                let tech = null;
                if (path?.techOptions) {
                    for (const t of path.techOptions) {
                        const found = t.projects?.find(pr => pr.id === projectId);
                        if (found) {
                            project = found;
                            tech = t;
                            break;
                        }
                    }
                }

                if (project) {
                    return `Project Overview Mode: The user is browsing the project "${project.title}" (${project.difficulty}).
Tech Stack: ${project.technologies?.join(', ')}
Project Goal: ${project.description}
Instructions for AI: Help them decide if this project matches their skill level, explain how setting up the architecture for ${tech?.title} works, or answer questions about what they will learn.`;
                }
            }

            if (pathname.includes('/select-tech')) {
                const pathId = parts[1];
                const path = skillPaths.find(p => p.id === pathId);
                const availableTechs = path?.techOptions?.map(t => t.title).join(', ') || '';

                return `Technology Selection: The user is deciding which technology to learn for the "${path?.title}" path. 
Available options: ${availableTechs}.
Instructions for AI: Analyze the pros and cons of these specific tech stacks. Help the user pick one based on their career goals, industry demand, or personal preference.`;
            }

            return 'General Navigation: The user is browsing the platform. Offer help navigating the application or explaining what raxlearn is.';
        } catch (e) {
            return 'The user is navigating the application. Be helpful.';
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user' as const, content: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    context: getPageContext()
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'API Error' }));
                throw new Error(`API Error: ${errorData.error || 'Unknown error'} (Status: ${response.status})`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error connecting to my neural network. Please try again in a moment.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageCircle size={28} />
            </button>

            <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[80vh] flex flex-col card-glass shadow-2xl transition-all duration-300 z-50 overflow-hidden ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>

                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold">Rax Assistant</h3>
                            <p className="text-xs text-emerald-100">Context-Aware AI</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition hover:bg-white/20 p-1 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40">
                    {messages.length === 0 && (
                        <div className="text-center p-6 text-gray-500 space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                <Bot size={32} className="text-emerald-600" />
                            </div>
                            <p className="text-sm">I am your deep-learning mentor. I am aware of what you are working on. How can I help you right now?</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 mt-1">
                                    <Bot size={16} />
                                </div>
                            )}
                            <div
                                className={`max-w-[85%] rounded-2xl p-3 ${msg.role === 'user'
                                        ? 'bg-emerald-600 text-white rounded-tr-sm'
                                        : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm'
                                    }`}
                            >
                                {msg.role === 'assistant' ? (
                                    <div className="markdown-body text-sm">
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-sm">{msg.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shrink-0 mt-1">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white/80 border-t border-gray-100 shrink-0">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask for guidance..."
                            className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-xl px-4 py-2 text-sm outline-none transition-all text-black"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
