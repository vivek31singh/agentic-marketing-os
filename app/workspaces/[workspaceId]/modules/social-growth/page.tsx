import React from 'react';
import Link from 'next/link';
import { Flame, Bell, Heart, Users, ArrowRight, Clock, TrendingUp, MessageCircle, Share2 } from 'lucide-react';
import { socialGrowthMetrics, socialThreads } from '@/data/socialGrowth';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';

const socialTypeIcons = {
  analysis: TrendingUp,
  outreach: MessageCircle,
  campaign: Share2,
  audit: Users
} as const;

const statusColors = {
  active: 'success',
  review: 'warning',
  pending: 'neutral'
} as const;

export default function SocialGrowthPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Social Growth Module</h1>
          <p className="text-neutral-600">Monitor social trends and manage viral campaigns</p>
        </div>
        <Badge variant="primary">System Operational</Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialGrowthMetrics.map((metric) => {
          const IconComponent = {
            flame: Flame,
            bell: Bell,
            heart: Heart,
            users: Users
          }[metric.icon as keyof typeof typeof { flame: Flame, bell: Bell, heart: Heart, users: Users }] || Flame;
          
          return (
            <MetricStat
              key={metric.label}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              icon={<IconComponent className="w-5 h-5" />}
            />
          );
        })}
      </div>

      {/* Active Threads Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Social Threads</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {socialThreads.map((thread) => {
            const threadType = thread.id.split('-')[0] as keyof typeof socialTypeIcons;
            const IconComponent = socialTypeIcons[threadType] || TrendingUp;
            
            return (
              <Card key={thread.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{thread.title}</h3>
                      <p className="text-sm text-neutral-500">{thread.objective}</p>
                    </div>
                  </div>
                  <Badge variant={statusColors[thread.status as keyof typeof statusColors]}>
                    {thread.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="w-4 h-4" />
                    <span>Updated 2h ago</span>
                  </div>
                  <Link href={`./${thread.id}`}>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Quick Actions</h3>
            <p className="text-sm text-neutral-600">Launch new campaigns or analyze trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Analyze Trends</Button>
            <Button>New Campaign</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
