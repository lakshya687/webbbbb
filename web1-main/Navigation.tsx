import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { startLogin } from '@/const';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

export function Navigation() {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover-lift"
          onClick={() => setLocation('/')}
        >
          <div className="gradient-primary rounded-lg p-2">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">Marketing Toolkit</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLocation('/catalog')}
            className={`text-sm font-medium transition-colors ${
              isActive('/catalog')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setLocation('/about')}
            className={`text-sm font-medium transition-colors ${
              isActive('/about')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            About
          </button>
        </div>

        {/* Auth Button */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.name || user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="button-primary"
              onClick={() => startLogin()}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
