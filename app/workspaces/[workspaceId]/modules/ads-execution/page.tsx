'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Megaphone, Target, DollarSign } from 'lucide-react';

export default function AdsExecutionPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Ads Execution</h1>
                    <p className="text-neutral-600">Automated campaign management and creative optimization</p>
                </div>
                <Badge variant="error" withDot>Attention Required (2)</Badge>
            </div>

            <Card className="p-6 border-error-100 bg-error-50/30">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-error-100 rounded-lg text-error-600">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-error-900">Budget Threshold Alert</h3>
                        <p className="text-sm text-error-700 mt-1">
                            "Performance_Bot" recommends shifting $500 from Facebook Retargeting to TikTok Top-of-Funnel due to a 34% drop in FB ROAS.
                        </p>
                        <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="error">Approve Pivot</Button>
                            <Button size="sm" variant="outline" className="bg-white">Deny</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary-500" />
                        Active Campaigns
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Spring Launch - Meta', spend: '$1,202', roas: '3.4x', status: 'Scaling' },
                            { name: 'Core Product - Google Search', spend: '$4,500', roas: '4.1x', status: 'Healthy' },
                        ].map((ad, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="text-sm font-semibold">{ad.name}</p>
                                    <p className="text-xs text-neutral-500">{ad.spend} spent today</p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="success" className="mb-1">{ad.roas} ROAS</Badge>
                                    <p className="text-xs text-neutral-400 font-medium">{ad.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-primary-50 rounded-full">
                        <Target className="w-8 h-8 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-neutral-900">Creative Lab</h4>
                    <p className="text-sm text-neutral-500 max-w-xs">
                        Agents are generating new ad variations based on high-performing copy from the Content Factory.
                    </p>
                    <Button variant="outline" size="sm">View Creative Queue</Button>
                </Card>
            </div>
        </div>
    );
}

// Fixed missing import in script
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
