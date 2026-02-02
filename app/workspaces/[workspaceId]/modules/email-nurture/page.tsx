'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mail, Send, UserCheck, Clock } from 'lucide-react';

export default function EmailNurturePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Email Nurture</h1>
                    <p className="text-neutral-600">Hyper-personalized lifecycle marketing across all touchpoints</p>
                </div>
                <Badge variant="primary" withDot>7 Flows Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Open Rate', value: '42.1%', icon: Mail },
                    { label: 'CTR', value: '5.8%', icon: Send },
                    { label: 'Unsub Rate', value: '0.12%', icon: UserCheck },
                    { label: 'Engaged Leads', value: '1,204', icon: Clock },
                ].map((stat, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex items-center gap-2 text-neutral-400 mb-1">
                            <stat.icon className="w-4 h-4" />
                            <span className="text-xs uppercase font-bold tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Live Personalization Feed</h3>
                <div className="space-y-4">
                    {[
                        { user: 'Sarah J.', action: 'Opened Welcome Series Step 2', time: '2m ago', score: 'P: 94' },
                        { user: 'Mike D.', action: 'Clicked "Pricing" in Abandoned Cart', time: '5m ago', score: 'P: 88' },
                        { user: 'Lena R.', action: 'Replied to Demo Request', time: '12m ago', score: 'P: 99' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-bold">
                                    {item.user[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">{item.user}</p>
                                    <p className="text-xs text-neutral-500">{item.action}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-neutral-400">{item.time}</p>
                                <Badge variant="primary" className="text-[10px] py-0">{item.score}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
