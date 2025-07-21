import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                Career Match
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover thousands of opportunities from top companies and startups. Your dream job is just a search away.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-strong max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Job Title Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Job title, skills, or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-0 shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base border-0 shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>

              {/* Search Button */}
              <Button variant="hero" size="lg" className="h-12 text-base font-semibold">
                <Search className="mr-2 h-5 w-5" />
                Search Jobs
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <span className="text-sm text-muted-foreground">Popular searches:</span>
              {["Remote", "Frontend Developer", "Product Manager", "Data Science", "Marketing"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { number: "10,000+", label: "Active Jobs" },
              { number: "500+", label: "Companies" },
              { number: "50,000+", label: "Job Seekers" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-white/80 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;