import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Maximize, Minimize, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Scroll to upload section
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getDisplayName = () => {
    const meta: any = user?.user_metadata;
    const name = meta?.full_name || meta?.name || (meta?.given_name && meta?.family_name ? `${meta.given_name} ${meta.family_name}` : undefined);
    if (name) return name as string;
    return 'Uday Gupta'; // Default name for display
  };

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Explore", href: "/explore" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">MindSphere AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {navItems.filter(item => item.label !== "Dashboard").map((item) => {
              if (item.href.startsWith('#')) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-smooth font-medium whitespace-nowrap px-2 py-1 rounded-md hover:bg-accent/50"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground hover:text-primary transition-smooth font-medium whitespace-nowrap px-2 py-1 rounded-md hover:bg-accent/50"
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
            {user ? (
              <>
                <Link to="/profile">
                  <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md hover:bg-muted/80 transition-colors cursor-pointer">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{getDisplayName()}</span>
                  </div>
                </Link>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleSignIn}>Sign In</Button>
                <Button variant="hero" onClick={handleGetStarted}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="py-4 space-y-2">
              {navItems.filter(item => item.label !== "Dashboard").map((item) => {
                if (item.href.startsWith('#')) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-foreground hover:text-primary transition-smooth font-medium rounded-md hover:bg-accent/50"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-4 py-2 text-foreground hover:text-primary transition-smooth font-medium rounded-md hover:bg-accent/50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
              <div className="px-4 pt-4 space-y-2">
                <Button
                  variant="ghost"
                  onClick={toggleFullscreen}
                  className="w-full"
                >
                  {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </Button>
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors cursor-pointer">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">{getDisplayName()}</span>
                      </div>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full" onClick={handleSignIn}>Sign In</Button>
                    <Button variant="hero" className="w-full" onClick={handleGetStarted}>Get Started</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;