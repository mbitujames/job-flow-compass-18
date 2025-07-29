import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, Bell, LogOut, LayoutDashboard, Building2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              JobFlow
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-foreground hover:text-primary transition-smooth">
              Find Jobs
            </Link>
            <Link to="/companies" className="text-foreground hover:text-primary transition-smooth">
              Companies
            </Link>
            <Link to="/resources" className="text-foreground hover:text-primary transition-smooth">
              Resources
            </Link>
            {isAuthenticated && (
              <Link 
                to={user?.role === "employer" || user?.role === "company" ? "/company-dashboard" : "/dashboard"} 
                className="text-foreground hover:text-primary transition-smooth"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                {(user?.role === "employer" || user?.role === "company") && (
                  <Link to="/post-job">
                    <Button variant="default" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>
                  </Link>
                )}
                <Link to={user?.role === "employer" || user?.role === "company" ? "/company-dashboard" : "/dashboard"}>
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button variant="hero" size="sm">
                    Post a Job
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-smooth"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/jobs" 
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link 
                to="/companies" 
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Companies
              </Link>
              <Link 
                to="/resources" 
                className="text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              {isAuthenticated && (
                <Link 
                  to={user?.role === "employer" || user?.role === "company" ? "/company-dashboard" : "/dashboard"}
                  className="text-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex flex-col space-y-2 pt-4">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    {(user?.role === "employer" || user?.role === "company") && (
                      <Link to="/post-job" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="default" size="sm" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Post Job
                        </Button>
                      </Link>
                    )}
                    <Link 
                      to={user?.role === "employer" || user?.role === "company" ? "/company-dashboard" : "/dashboard"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="ghost" size="sm" className="justify-start w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="justify-start w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="justify-start w-full">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/post-job" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="hero" size="sm" className="w-full">
                        Post a Job
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;