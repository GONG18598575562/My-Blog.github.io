import { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-16 w-16 text-2xl',
  lg: 'h-20 w-20 text-3xl',
};

export function Avatar({ src, alt, name, size = 'md' }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  if (!src || imgError) {
    return (
      <div className={`${sizeMap[size]} rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold ring-2 ring-primary/30 glow-sm`}>
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || name}
      onError={() => setImgError(true)}
      className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-primary/30`}
    />
  );
}
