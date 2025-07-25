import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Briefcase, Heart, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/contexts/JobContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { applyToJob } = useJobs();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for jobs",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    setIsApplying(true);
    try {
      const success = await applyToJob(job.id, coverLetter);
      if (success) {
        toast({
          title: "Application submitted!",
          description: "Your application has been sent successfully",
        });
        setIsApplyDialogOpen(false);
        setCoverLetter("");
      } else {
        toast({
          title: "Application failed",
          description: "Unable to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

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
        
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              Apply Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us why you're interested in this position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApply} disabled={isApplying}>
                  {isApplying ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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