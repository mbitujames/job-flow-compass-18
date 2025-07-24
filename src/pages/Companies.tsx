import Header from "@/components/JobBoard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Star } from "lucide-react";

const mockCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "🚀",
    description: "Leading software development company specializing in AI and machine learning solutions.",
    location: "San Francisco, CA",
    employees: "1000-5000",
    rating: 4.8,
    openJobs: 23,
    industry: "Technology"
  },
  {
    id: 2,
    name: "DataFlow Inc",
    logo: "📊",
    description: "Data analytics and business intelligence platform for modern enterprises.",
    location: "New York, NY",
    employees: "500-1000",
    rating: 4.6,
    openJobs: 15,
    industry: "Data & Analytics"
  },
  {
    id: 3,
    name: "CloudNine Systems",
    logo: "☁️",
    description: "Cloud infrastructure and DevOps solutions for scalable applications.",
    location: "Seattle, WA",
    employees: "100-500",
    rating: 4.7,
    openJobs: 8,
    industry: "Cloud Computing"
  },
  {
    id: 4,
    name: "FinTech Innovations",
    logo: "💰",
    description: "Revolutionary financial technology solutions for the digital economy.",
    location: "Austin, TX",
    employees: "200-500",
    rating: 4.5,
    openJobs: 12,
    industry: "FinTech"
  }
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-br from-accent/10 via-background to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Top Companies Hiring
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing companies and find your next career opportunity
          </p>
          
          {/* Search Bar */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search companies..."
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {mockCompanies.length} Companies Found
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{company.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{company.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{company.industry}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {company.description}
                  </CardDescription>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{company.employees} employees</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      {company.openJobs} open jobs
                    </span>
                    <Button variant="outline" size="sm">
                      View Company
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Companies;