import { useState } from "react";
import Header from "@/components/JobBoard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, MapPin, DollarSign, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [currentBenefit, setCurrentBenefit] = useState("");

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addBenefit = () => {
    if (currentBenefit.trim() && !benefits.includes(currentBenefit.trim())) {
      setBenefits([...benefits, currentBenefit.trim()]);
      setCurrentBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter(benefit => benefit !== benefitToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting has been published and is now live.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Find the perfect candidate for your team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="e.g. Senior Frontend Developer" required />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="e.g. TechCorp Inc." required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level">Experience Level</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="lead">Lead/Principal</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA" required />
                </div>
                <div>
                  <Label htmlFor="remote">Remote Options</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select remote policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Fully Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className="min-h-[120px]"
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea 
                  id="requirements" 
                  placeholder="List the required qualifications, experience, and skills..."
                  className="min-h-[100px]"
                  required 
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skills */}
              <div>
                <Label>Required Skills</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="e.g. React, TypeScript"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <Label>Benefits & Perks</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    value={currentBenefit}
                    onChange={(e) => setCurrentBenefit(e.target.value)}
                    placeholder="e.g. Health Insurance, 401k"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" onClick={addBenefit} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="flex items-center gap-1">
                      {benefit}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeBenefit(benefit)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                  <Input id="salaryMin" type="number" placeholder="e.g. 80000" />
                </div>
                <div>
                  <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                  <Input id="salaryMax" type="number" placeholder="e.g. 120000" />
                </div>
                <div>
                  <Label htmlFor="salaryType">Salary Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yearly">Per Year</SelectItem>
                      <SelectItem value="monthly">Per Month</SelectItem>
                      <SelectItem value="hourly">Per Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Post Job
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;