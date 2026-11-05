import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypingEffect({
  phrases,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseTime = 1600,
}: TypingEffectProps) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && text === '') {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }, deleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block w-[2px] h-[1.1em] translate-y-[0.2em] bg-primary animate-blink" />
    </span>
  );
}
