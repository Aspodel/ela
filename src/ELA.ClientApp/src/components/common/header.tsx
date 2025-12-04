import { Link } from '@tanstack/react-router';
import {
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  CloudyIcon,
  FolderIcon,
  BrainIcon,
} from 'lucide-react';

import { useSignOut, useUser } from '@/lib/auth';

import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const logout = useSignOut();
  const { data: user } = useUser();

  const handleLogout = () => {
    logout.mutate();
  };

  const navItems = [
    { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboardIcon },
    { label: 'Vocabulary', to: '/app/vocabulary', icon: CloudyIcon },
    { label: 'Flashcard', to: '/app/flashcard', icon: FolderIcon },
    { label: 'Quiz', to: '/app/quiz', icon: BrainIcon },
  ];

  return (
    <header className='sticky top-0 z-50 bg-background/70 backdrop-blur-xs border-b border-muted'>
      <div className='flex items-center justify-between py-3'>
        <Link to='/' className='font-bold text-xl'>
          ELA
        </Link>

        <nav className='hidden md:flex items-center text-muted-foreground font-medium gap-8'>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className='flex items-center gap-1 hover:scale-[1.05] transition-transform'
              activeProps={{
                className: 'text-primary font-semibold',
              }}
            >
              <item.icon className='size-4' />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-4'>
          <ThemeToggle
            className='group size-8 hover:[&>svg]:scale-120 hover:[&>svg]:transition-all'
            variant='ghost'
            size='icon'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='size-10 cursor-pointer'>
                <AvatarImage src={''} alt={''} />
                <AvatarFallback>
                  {user?.firstName?.[0] || user?.userName?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='min-w-56'
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar>
                    <AvatarImage src={''} alt={''} />
                    <AvatarFallback>
                      {' '}
                      {user?.firstName?.[0] ||
                        user?.userName?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>
                      {user?.userName}
                    </span>
                    <span className='truncate text-sm'>{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SparklesIcon className='hover:text-accent-foreground' />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon className='hover:text-accent-foreground' />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className='hover:text-accent-foreground' />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon className='hover:text-accent-foreground' />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOutIcon className='hover:text-accent-foreground' />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
