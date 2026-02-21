import { NextResponse } from 'next/server';
import { RaxAI } from 'rax-ai';

// Initialize the client
const rax = new RaxAI({
    apiKey: process.env.RAX_API_KEY || 'dummy_key_for_build', // Fallback for build time if undefined
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages, context } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Valid messages array is required' }, { status: 400 });
        }

        // Build the system prompt using the injected context
        const systemPrompt = `You are a deeply integrated, expert AI assistant for "raxlearn", an advanced learning platform for software engineering and architecture.
Your goal is to provide highly contextual, insightful assistance without giving away direct answers that undermine the learning process.

Current Page Context:
${context || 'The user is navigating the application.'}

Guidelines:
1. Act as a senior engineer mentoring a junior developer.
2. If the user asks for code, provide guidance, debugging tips, and concepts, rather than full copy-paste solutions.
3. Keep responses concise, formatted clearly with Markdown, and engaging.
4. If in a specific technology or language context, tailor your answers to idioms of that ecosystem.`;

        const allMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
        ];

        const response = await rax.chat({
            model: 'rax-4.0',
            messages: allMessages,
        });

        const reply = response.choices?.[0]?.message?.content || 'I encountered an error processing your request.';

        return NextResponse.json({
            role: 'assistant',
            content: reply
        });

    } catch (error: any) {
        console.error('Rax AI API Error:', error);
        // Log more specific error details for debugging
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return NextResponse.json(
            {
                error: 'An error occurred while communicating with the AI assistant.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
