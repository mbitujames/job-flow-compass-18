import Header from "@/components/JobBoard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Briefcase, Target, FileText, Video, MessageCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const getResourceLink = (title: string) => {
    switch (title) {
      case "Resume Builder": return "/resume-builder";
      case "Skill Assessment": return "/skill-assessment";
      default: return "#";
    }
  };
  const resourceCategories = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume Builder",
      description: "Create professional resumes with our AI-powered builder",
      badge: "Popular",
      color: "bg-blue-500"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Career Guides",
      description: "Expert advice on career development and job searching",
      badge: "Updated",
      color: "bg-green-500"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Interview Prep",
      description: "Practice interviews and get feedback from professionals",
      badge: "Premium",
      color: "bg-purple-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Salary Insights",
      description: "Research compensation data across industries and roles",
      badge: "Data-driven",
      color: "bg-orange-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Networking Hub",
      description: "Connect with professionals in your industry",
      badge: "Community",
      color: "bg-indigo-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Skill Assessment",
      description: "Evaluate your skills and identify growth opportunities",
      badge: "Free",
      color: "bg-red-500"
    }
  ];

  const articles = [
    {
      title: "10 Tips for a Successful Job Interview",
      category: "Interview Tips",
      readTime: "5 min read",
      author: "Sarah Johnson"
    },
    {
      title: "How to Negotiate Your Salary",
      category: "Career Advice",
      readTime: "7 min read",
      author: "Mike Chen"
    },
    {
      title: "Remote Work Best Practices",
      category: "Remote Work",
      readTime: "6 min read",
      author: "Alex Rodriguez"
    },
    {
      title: "Building Your Professional Network",
      category: "Networking",
      readTime: "8 min read",
      author: "Emily Davis"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Career Resources
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Everything you need to advance your career and land your dream job
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Career Tools & Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {resourceCategories.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${resource.color} text-white group-hover:scale-110 transition-transform`}>
                      {resource.icon}
                    </div>
                    <Badge variant="secondary">{resource.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {resource.description}
                  </CardDescription>
                  <Link to={getResourceLink(resource.title)}>
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Latest Career Articles
            </h2>
            <Button variant="outline">
              View All Articles
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-8">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Need Personalized Career Advice?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get one-on-one guidance from our career experts and accelerate your professional growth
              </p>
              <Button size="lg">
                Schedule a Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Resources;