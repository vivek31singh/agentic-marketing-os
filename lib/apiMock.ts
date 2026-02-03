// Mock API functions for thread management

import { Thread, mockAgents } from '@/data/mockData';

// Mock thread data store
const mockThreads: Record<string, Thread & { conflict?: { id: string; reason: string; options: Array<{ agent: typeof mockAgents[0]; description: string; label: string; outcome: string }> } }> = {
    'thread-1': {
        id: 'thread-1',
        slug: 'q1-keyword-research-technology-cluster',
        title: 'Q1 Keyword Research - Technology Cluster',
        status: 'active',
        objective: 'Identify high-value keywords for Q1 technology content strategy',
        events: [
            {
                type: 'message',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                agent: mockAgents[0],
                content: 'Starting keyword analysis for technology cluster...',
                logicChain: ['Initialized keyword research module', 'Loaded competition data', 'Analyzing search volume trends'],
            },
            {
                type: 'message',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                agent: mockAgents[1],
                content: 'Found 47 high-potential keywords with monthly search volume > 10k',
                logicChain: ['Filtered by search volume', 'Applied competition score threshold', 'Ranked by opportunity score'],
            },
            {
                type: 'system',
                timestamp: new Date(Date.now() - 900000).toISOString(),
                agent: mockAgents[0],
                content: 'Analysis complete. Ready for review.',
            },
        ],
    },
    'thread-2': {
        id: 'thread-2',
        slug: 'content-brief-generation',
        title: 'Content Brief Generation',
        status: 'active',
        objective: 'Generate comprehensive content briefs for top-priority topics',
        events: [
            {
                type: 'message',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                agent: mockAgents[2],
                content: 'Generating content briefs based on approved keyword list...',
            },
        ],
        conflict: {
            id: 'conflict-1',
            reason: 'Multiple content formats suggested for the same topic',
            options: [
                {
                    agent: mockAgents[2],
                    description: 'Create a comprehensive long-form guide (5000+ words)',
                    label: 'Long-form Guide',
                    outcome: 'Higher SEO value but longer production time',
                },
                {
                    agent: mockAgents[3],
                    description: 'Create a series of shorter posts (3x 1500 words)',
                    label: 'Blog Series',
                    outcome: 'Faster publication but may reduce overall authority',
                },
            ],
        },
    },
};

export function getThread(threadId: string): Thread & { conflict?: { id: string; reason: string; options: Array<{ agent: typeof mockAgents[0]; description: string; label: string; outcome: string }> } } {
    return mockThreads[threadId] || {
        id: threadId,
        title: `Thread ${threadId}`,
        status: 'active',
        objective: 'Thread objective description',
        events: [],
    };
}

export function updateThread(threadId: string, updates: Partial<Thread>): void {
    if (mockThreads[threadId]) {
        Object.assign(mockThreads[threadId], updates);
    }
}
