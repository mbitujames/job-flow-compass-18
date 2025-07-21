import Header from "@/components/JobBoard/Header";
import Hero from "@/components/JobBoard/Hero";
import JobList from "@/components/JobBoard/JobList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JobList />
    </div>
  );
};

export default Index;
