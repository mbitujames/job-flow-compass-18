import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, Heart, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    postedTime: string;
    description: string;
    skills: string[];
    isRemote?: boolean;
    isFeatured?: boolean;
    companyLogo?: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-gradient-card border border-border rounded-xl p-6 shadow-soft hover:shadow-medium transition-smooth group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-8 h-8 rounded" />
            ) : (
              job.company.charAt(0)
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-smooth">
              {job.title}
            </h3>
            <p className="text-muted-foreground font-medium">{job.company}</p>
          </div>
        </div>

        {/* Bookmark */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
          {job.isRemote && <Badge variant="secondary" className="ml-1">Remote</Badge>}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{job.postedTime}</span>
        </div>
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="mb-4">
          <span className="text-lg font-semibold text-success">{job.salary}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.slice(0, 4).map((skill, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 4 && (
          <Badge variant="outline" className="text-xs">
            +{job.skills.length - 4} more
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Details
        </Button>
        <Button variant="default" size="sm">
          Apply Now
        </Button>
      </div>

      {/* Featured Badge */}
      {job.isFeatured && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-warning text-warning-foreground">Featured</Badge>
        </div>
      )}
    </div>
  );
};

export default JobCard;