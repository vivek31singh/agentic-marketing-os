'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PieChart, TrendingUp, Zap } from 'lucide-react';

export default function AnalyticsActionPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Analytics Action</h1>
                    <p className="text-neutral-600">Turning raw data into automated marketing maneuvers</p>
                </div>
                <Badge variant="success" withDot>Live Monitoring</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Conversion Lift', value: '+12.4%', icon: TrendingUp, color: 'text-success-600' },
                    { label: 'Agent Interventions', value: '42', icon: Zap, color: 'text-primary-600' },
                    { label: 'Data Freshness', value: 'Live', icon: PieChart, color: 'text-info-600' },
                ].map((stat, i) => (
                    <Card key={i} className="p-4 flex items-center gap-4">
                        <div className={`p-2 rounded-lg bg-neutral-100 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider">{stat.label}</p>
                            <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-info-50 rounded-full">
                    <PieChart className="w-12 h-12 text-info-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900">Connecting Data Streams</h2>
                <p className="text-neutral-500 max-w-md mx-auto">
                    We are consolidating your Google Analytics, Meta Ads, and PostHog data. Agents will begin executing maneuvers once thresholds are met.
                </p>
                <div className="flex gap-2">
                    <Badge variant="outline">Meta Ads: Connected</Badge>
                    <Badge variant="outline">GA4: Syncing...</Badge>
                    <Badge variant="outline">Shopify: Connected</Badge>
                </div>
            </Card>
        </div>
    );
}
