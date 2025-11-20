import React from 'react';
import { Link } from '@tanstack/react-router';
import { MenuIcon, XIcon } from 'lucide-react';

import { useUser } from '@/lib/auth';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

type NavItem = { label: string; to: string };

const NAV_ITEMS: NavItem[] = [
  { label: 'Features', to: 'features' },
  { label: 'Demo', to: 'demo' },
  { label: 'Feedback', to: 'testimonials' },
  { label: 'Pricing', to: 'pricing' },
];

export function Header() {
  const { data: user } = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleMobile = React.useCallback(() => setMobileOpen((v) => !v), []);

  const scrollToSection = React.useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <header className='sticky top-0 z-10 bg-background/70 backdrop-blur-sm border-b border-muted'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>
        <Link
          onClick={() => scrollToSection('hero')}
          className='font-bold text-xl'
          to={undefined}
        >
          ELA
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center text-muted-foreground font-medium gap-6'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              onClick={() => scrollToSection(item.to)}
              className='hover:text-primary hover:scale-[1.05] transition-transform'
              to={undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className='hidden md:flex items-center gap-3'>
          <ThemeToggle
            className='group size-8 hover:[&>svg]:scale-120 hover:[&>svg]:transition-all'
            variant='ghost'
            size='icon'
          />

          {user ? (
            <Button asChild>
              <Link to='/app'>Go to app</Link>
            </Button>
          ) : (
            <>
              <Button variant='outline' className='text-primary' asChild>
                <Link to='/app'>Sign In</Link>
              </Button>
              <Button onClick={() => scrollToSection('demo')}>Explore</Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <Button
          variant='outline'
          className='md:hidden inline-flex'
          aria-label='Toggle menu'
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          {mobileOpen ? (
            <XIcon className='size-5 transition-all duration-300' />
          ) : (
            <MenuIcon className='size-5 transition-all duration-300' />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className='md:hidden border-t border-muted bg-background/90 backdrop-blur-xs'>
          <div className='px-6 py-4 flex flex-col gap-3'>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                onClick={() => scrollToSection(item.to)}
                className='py-2 text-left'
              >
                {item.label}
              </Button>
            ))}

            <Link
              to={user ? '/app' : '/signin'}
              className='py-2 font-medium text-primary'
            >
              {user ? 'Go to App' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
