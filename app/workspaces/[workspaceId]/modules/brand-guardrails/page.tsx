'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function BrandGuardrailsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Brand Guardrails</h1>
                    <p className="text-neutral-600">Enforcing brand consistency across all agentic outputs</p>
                </div>
                <Badge variant="success" withDot>Governance Active</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-success-500" />
                        Compliance Scan Results
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 border border-success-200 bg-success-50/50 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-medium text-success-900">Style Guide Adherence</p>
                                <p className="text-xs text-success-700">All modules currently following core identity rules.</p>
                            </div>
                            <span className="text-xl font-bold text-success-600">100%</span>
                        </div>

                        <div className="p-4 border border-warning-200 bg-warning-50/50 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-medium text-warning-900">Legal Review Queue</p>
                                <p className="text-xs text-warning-700">3 Tweets pending approval for medical disclaimer check.</p>
                            </div>
                            <Badge variant="warning">3 Items</Badge>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary-500" />
                        Forbidden Lexicon
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['cheap', 'guaranteed', 'best in world', 'disruptor', 'ninja'].map((word) => (
                            <Badge key={word} variant="outline" className="bg-white">
                                "{word}"
                            </Badge>
                        ))}
                    </div>
                    <p className="text-xs text-neutral-500 mt-4">
                        Agents are blocked from using these terms in any public-facing copy.
                    </p>
                </Card>
            </div>

            <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 bg-neutral-900 text-white">
                <Eye className="w-12 h-12 text-primary-400" />
                <h2 className="text-xl font-semibold">Real-time Watcher</h2>
                <p className="text-neutral-400 max-w-sm">
                    "Brand_Guard" is silent-monitoring 14 active threads for tone shifts or policy violations.
                </p>
            </Card>
        </div>
    );
}
