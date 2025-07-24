import Header from "@/components/JobBoard/Header";
import JobList from "@/components/JobBoard/JobList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse thousands of job opportunities from top companies worldwide
          </p>
          
          {/* Search Bar */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Job title, keywords..."
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Location"
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12">
                <Search className="mr-2 h-5 w-5" />
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <JobList />
    </div>
  );
};

export default Jobs;