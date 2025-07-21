import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import JobCard from "./JobCard";
import { Filter, Search, MapPin, SlidersHorizontal, Grid, List } from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    postedTime: "2 days ago",
    description: "We're looking for a senior frontend developer to join our growing team. You'll be working on cutting-edge React applications and helping shape our frontend architecture.",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    isRemote: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupCo",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $160k",
    postedTime: "1 day ago",
    description: "Join our product team to drive strategy and execution for our flagship SaaS platform. Experience with B2B products and agile methodologies required.",
    skills: ["Product Strategy", "Agile", "Analytics", "User Research", "Figma"],
    isRemote: false,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    postedTime: "5 hours ago",
    description: "Looking for a data scientist to work on machine learning models and data analysis. Strong Python and SQL skills required.",
    skills: ["Python", "SQL", "Machine Learning", "TensorFlow", "Pandas"],
    isRemote: true,
    isFeatured: false,
  },
  {
    id: "4",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$85k - $110k",
    postedTime: "3 days ago",
    description: "We're seeking a talented UX designer to create intuitive and beautiful user experiences for our mobile and web applications.",
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems"],
    isRemote: true,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: "CloudCorp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110k - $150k",
    postedTime: "1 week ago",
    description: "Join our backend team to build scalable microservices and APIs. Experience with cloud platforms and containerization preferred.",
    skills: ["Java", "Spring Boot", "Docker", "Kubernetes", "AWS"],
    isRemote: false,
    isFeatured: false,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "InfraCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$125k - $165k",
    postedTime: "4 days ago",
    description: "We're looking for a DevOps engineer to help us scale our infrastructure and improve our deployment processes.",
    skills: ["AWS", "Terraform", "Jenkins", "Docker", "Monitoring"],
    isRemote: true,
    isFeatured: false,
  },
];

const JobList = () => {
  const [jobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

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

        {/* Search and Filters */}
        <div className="bg-card rounded-xl p-6 shadow-soft mb-8">
          {/* Main Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="h-12"
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
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

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Salary Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50k">$0 - $50k</SelectItem>
                  <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                  <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                  <SelectItem value="150k+">$150k+</SelectItem>
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
              <Badge variant="secondary">Featured</Badge>
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobList;