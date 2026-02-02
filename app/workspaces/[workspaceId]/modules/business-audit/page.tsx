'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BarChart3, ShieldCheck, Search } from 'lucide-react';

export default function BusinessAuditPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Business Audit</h1>
                    <p className="text-neutral-600">Comprehensive analysis of brand voice, strategy, and business health</p>
                </div>
                <Badge variant="warning" withDot>Agents Initializing</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                    <div className="p-4 bg-primary-50 rounded-full">
                        <BarChart3 className="w-12 h-12 text-primary-600 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-neutral-900">AI Business Auditor</h2>
                        <p className="text-neutral-500 max-w-sm mx-auto mt-2">
                            Our agents are currently scanning your brand assets and market positioning to generate a gap analysis.
                        </p>
                    </div>
                    <Badge variant="primary">Step 1: Context Extraction (45%)</Badge>
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-neutral-900 border-b pb-2">Pending Audit Tasks</h3>
                    {[
                        { task: 'Brand Voice Analysis', status: 'In Progress', icon: Search },
                        { task: 'Market Opportunity Scan', status: 'Queued', icon: BarChart3 },
                        { task: 'Competitor Benchmarking', status: 'Queued', icon: ShieldCheck },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <item.icon className="w-4 h-4 text-neutral-400" />
                                <span className="text-sm font-medium text-neutral-700">{item.task}</span>
                            </div>
                            <Badge variant="ghost" className="text-xs">{item.status}</Badge>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}
