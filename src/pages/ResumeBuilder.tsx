import { useState } from "react";
import Header from "@/components/JobBoard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Download, Eye, FileText, User, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: FileText },
  ];

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      degree: "",
      school: "",
      year: ""
    }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleDownload = () => {
    toast({
      title: "Resume Downloaded!",
      description: "Your resume has been generated and downloaded as PDF.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Preview Ready",
      description: "Opening resume preview in new window.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume with our AI-powered builder</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </Button>
                  );
                })}
                
                <div className="pt-4 space-y-2">
                  <Button onClick={handlePreview} variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Personal Information */}
                {activeTab === "personal" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St, City, State 12345" />
                    </div>
                    
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        placeholder="Write a brief summary of your professional background..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                    
                    {experiences.map((exp) => (
                      <Card key={exp.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                              <div>
                                <Label>Job Title</Label>
                                <Input 
                                  value={exp.title}
                                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                  placeholder="Software Engineer"
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input 
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  placeholder="TechCorp Inc."
                                />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Start Date</Label>
                              <Input 
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>End Date</Label>
                              <Input 
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Education */}
                {activeTab === "education" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Education</h3>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                    
                    {education.map((edu) => (
                      <Card key={edu.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                              <div>
                                <Label>Degree</Label>
                                <Input 
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                  placeholder="Bachelor of Science in Computer Science"
                                />
                              </div>
                              <div>
                                <Label>School</Label>
                                <Input 
                                  value={edu.school}
                                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                  placeholder="University of Technology"
                                />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div>
                            <Label>Graduation Year</Label>
                            <Input 
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                              placeholder="2023"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div>
                      <Label>Add Skills</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          placeholder="e.g. JavaScript, React, Node.js"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        />
                        <Button onClick={addSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Your Skills</Label>
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
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;