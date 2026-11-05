import { useEffect, useState } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'success';
  text: string;
}

const LINES: TerminalLine[] = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'GONG · 开发者 / 思考者' },
  { type: 'command', text: 'cat ./skills.txt' },
  { type: 'output', text: 'React · TypeScript · Python · AI' },
  { type: 'command', text: 'echo $blog_status' },
  { type: 'output', text: '持续更新中，欢迎交流 ~' },
  { type: 'command', text: 'sudo make dreams' },
  { type: 'success', text: 'building ... [OK]' },
];

const LINE_DELAY = 550;

export function TerminalCard() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= LINES.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), LINE_DELAY);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  const finished = visibleCount >= LINES.length;

  return (
    <div className="card-glass overflow-hidden font-mono text-[13px] leading-relaxed select-none">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-muted/50">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-muted-foreground">gong@thinkcraft: ~</span>
      </div>

      <div className="px-4 py-3.5 bg-[#0d1117] text-slate-300 min-h-[212px]">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
            {line.type === 'command' ? (
              <span className="text-slate-100">
                <span className="text-cyan-400">$</span> {line.text}
              </span>
            ) : line.type === 'success' ? (
              <span className="ml-4 text-emerald-400">{line.text}</span>
            ) : (
              <span className="ml-4 text-cyan-300/90">{line.text}</span>
            )}
          </div>
        ))}

        {finished && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-cyan-400">$</span>
            <span className="inline-block w-2 h-4 bg-cyan-300/80 animate-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
