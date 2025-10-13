import Link from 'next/link';
import { Camera } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Camera className="h-6 w-6 text-primary" />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        SketchAI
      </span>
    </Link>
  );
}
