import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Briefcase, Building2, Users, FileText, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">JobFlow</div>
            <p className="text-muted-foreground text-sm">
              Connecting talented professionals with amazing opportunities. Find your dream job or hire top talent.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/jobs" className="block text-muted-foreground hover:text-primary transition-smooth">
                <Briefcase className="inline h-4 w-4 mr-2" />
                Find Jobs
              </Link>
              <Link to="/companies" className="block text-muted-foreground hover:text-primary transition-smooth">
                <Building2 className="inline h-4 w-4 mr-2" />
                Companies
              </Link>
              <Link to="/post-job" className="block text-muted-foreground hover:text-primary transition-smooth">
                <FileText className="inline h-4 w-4 mr-2" />
                Post a Job
              </Link>
              <Link to="/resources" className="block text-muted-foreground hover:text-primary transition-smooth">
                <Users className="inline h-4 w-4 mr-2" />
                Resources
              </Link>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Job Seekers</h3>
            <div className="space-y-2 text-sm">
              <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-smooth">
                Dashboard
              </Link>
              <Link to="/resume-builder" className="block text-muted-foreground hover:text-primary transition-smooth">
                Resume Builder
              </Link>
              <Link to="/skill-assessment" className="block text-muted-foreground hover:text-primary transition-smooth">
                Skill Assessment
              </Link>
              <Link to="/signin" className="block text-muted-foreground hover:text-primary transition-smooth">
                Sign In
              </Link>
            </div>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Employers</h3>
            <div className="space-y-2 text-sm">
              <Link to="/company-dashboard" className="block text-muted-foreground hover:text-primary transition-smooth">
                Company Dashboard
              </Link>
              <Link to="/post-job" className="block text-muted-foreground hover:text-primary transition-smooth">
                Post Jobs
              </Link>
              <Link to="/companies" className="block text-muted-foreground hover:text-primary transition-smooth">
                Browse Companies
              </Link>
              <Link to="/signin" className="block text-muted-foreground hover:text-primary transition-smooth">
                Employer Login
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 JobFlow. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;