import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
import JobCard from "./JobCard";
import { Filter, Search, MapPin, SlidersHorizontal, Grid, List } from "lucide-react";
import { useJobs } from "@/contexts/JobContext";

const JobList = () => {
  const { jobs, fetchJobs, isLoading } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Fallback jobs when backend is not available
  const fallbackJobs = [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      description: "We are looking for an experienced frontend developer to join our team and build amazing user experiences.",
      companyId: { _id: "1", name: "TechCorp", description: "Leading tech company", location: "San Francisco, CA" },
      location: "San Francisco, CA",
      salaryRange: "$120,000 - $150,000",
      skillsRequired: ["React", "JavaScript", "TypeScript", "CSS"],
      status: "open" as const,
      postedAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z"
    },
    {
      _id: "2", 
      title: "Product Manager",
      description: "Seeking a strategic product manager to drive our product roadmap and work with cross-functional teams.",
      companyId: { _id: "2", name: "InnovateCo", description: "Innovation company", location: "New York, NY" },
      location: "New York, NY",
      salaryRange: "$110,000 - $140,000",
      skillsRequired: ["Product Strategy", "Analytics", "Agile", "Roadmapping"],
      status: "open" as const,
      postedAt: "2024-01-14T00:00:00Z",
      updatedAt: "2024-01-14T00:00:00Z"
    },
    {
      _id: "3",
      title: "Data Scientist",
      description: "Join our data team to build machine learning models and derive insights from complex datasets.",
      companyId: { _id: "3", name: "DataDrive", description: "Data analytics company", location: "Seattle, WA" },
      location: "Seattle, WA",
      salaryRange: "$130,000 - $160,000",
      skillsRequired: ["Python", "Machine Learning", "SQL", "Statistics"],
      status: "open" as const,
      postedAt: "2024-01-13T00:00:00Z",
      updatedAt: "2024-01-13T00:00:00Z"
    },
    {
      _id: "4",
      title: "UX Designer",
      description: "Looking for a creative UX designer to enhance user experiences and create intuitive interfaces.",
      companyId: { _id: "4", name: "DesignStudio", description: "Creative design agency", location: "Austin, TX" },
      location: "Austin, TX", 
      salaryRange: "$90,000 - $120,000",
      skillsRequired: ["Figma", "User Research", "Prototyping", "Design Systems"],
      status: "open" as const,
      postedAt: "2024-01-12T00:00:00Z",
      updatedAt: "2024-01-12T00:00:00Z"
    },
    {
      _id: "5",
      title: "Backend Engineer",
      description: "Build scalable backend systems and APIs to support our growing platform.",
      companyId: { _id: "5", name: "CloudTech", description: "Cloud infrastructure company", location: "Remote" },
      location: "Remote",
      salaryRange: "$125,000 - $155,000",
      skillsRequired: ["Node.js", "Python", "AWS", "Microservices"],
      status: "open" as const,
      postedAt: "2024-01-11T00:00:00Z",
      updatedAt: "2024-01-11T00:00:00Z"
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchJobs(query);
  };

  // Use fallback jobs if backend jobs are empty
  const jobsToUse = jobs.length > 0 ? jobs : fallbackJobs;
  
  // Transform jobs to match frontend format
  const transformedJobs = jobsToUse.map(job => ({
    _id: job._id,
    id: job._id,
    title: job.title,
    company: job.companyId?.name || 'Unknown Company',
    location: job.location || 'Remote',
    type: 'Full-time', // Default since backend doesn't have this field yet
    salary: job.salaryRange || 'Competitive',
    postedTime: new Date(job.postedAt).toLocaleDateString(),
    description: job.description,
    skills: job.skillsRequired || [],
    isRemote: job.location?.toLowerCase().includes('remote') || false,
    isFeatured: false,
  }));

  // Filter jobs based on search criteria
  const filteredJobs = transformedJobs.filter((job) => {
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesLocation && matchesType;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your next career move with positions from industry-leading companies
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Advanced Filters */}
        <div className="bg-card rounded-xl p-6 shadow-soft mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filter Jobs</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              size="sm"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                  <SelectItem value="lead">Lead/Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {filteredJobs.length} jobs found
            </span>
            <div className="flex gap-2">
              <Badge variant="secondary">Remote Available</Badge>
              <Badge variant="secondary">Latest Postings</Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Job Cards */}
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        )}

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobList;