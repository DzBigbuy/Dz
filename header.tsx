import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Button variant="ghost" size="icon">
          <Languages className="h-6 w-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <span
            className="font-logo text-4xl font-bold tracking-wider"
            style={{ color: '#FFD700', textShadow: '1px 1px 2px hsl(var(--muted-foreground) / 0.5)' }}
          >
            DzBigBuy
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

    