import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { workspaces } from '@/data/mockData';
import {
  ArrowRight,
  LayoutDashboard,
  Zap,
  Shield,
  Globe,
  Rocket,
  Cpu,
  Sparkles
} from 'lucide-react';

export default function RootPage() {
  const primaryWorkspace = workspaces[0];

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-primary-500/30 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-primary-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 min-h-screen flex flex-col items-center justify-center">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-bold tracking-widest uppercase">Agentic Marketing OS v1.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            ENGINEERING THE <br /> FUTURE OF GROWTH
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
            Deploy an autonomous workforce of specialized AI agents. Audit, optimize, and execute marketing maneuvers at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={`/workspaces/${primaryWorkspace.id}/mission-control`}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] bg-primary-600 hover:bg-primary-500 transition-all font-bold">
                Enter Agentic OS
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold backdrop-blur-sm">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Feature Grid - Modern Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { icon: Cpu, title: 'Multi-Agent Logic', desc: 'Conflict resolution & logic chain verification.' },
            { icon: Zap, title: 'Real-time Maneuvers', desc: 'Automated execution based on live market data.' },
            { icon: Shield, title: 'Brand Guardrails', desc: 'Hardware-level compliance and safety protocols.' },
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all hover:border-primary-500/50">
              <feature.icon className="w-10 h-10 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Workspace Quick Switch Preview - Visual Hint of Discord Switcher */}
        <div className="mt-24 pt-12 border-t border-white/5 w-full text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-neutral-600 mb-8">Active Strategic Units</p>
          <div className="flex flex-wrap justify-center gap-4">
            {workspaces.map((w) => (
              <Link key={w.id} href={`/workspaces/${w.id}/mission-control`}>
                <div className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary-500/30 hover:bg-white/5 transition-all text-neutral-500 hover:text-white cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success-500 group-hover:animate-ping" />
                    <span className="font-bold">{w.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
