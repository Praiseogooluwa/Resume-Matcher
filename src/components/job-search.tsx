import { useState } from 'react';
import { Search, Briefcase, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Job {
  title: string;
  company: string;
  location?: string;
  description: string;
  apply_link?: string;
}

interface JobSearchResult {
  jobs: Job[];
  error?: string;
}

export const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Enter a search term",
        description: "Please enter a job title to search for.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch(
        `https://resume-project-6faq.onrender.com/get-jobs/?query=${encodeURIComponent(query.trim())}`
      );
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data: JobSearchResult = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setJobs(data.jobs || []);
      
      if (data.jobs && data.jobs.length > 0) {
        toast({
          title: `Found ${data.jobs.length} job opportunities! 💼`,
          description: "Check out these amazing positions.",
        });
      } else {
        toast({
          title: "No jobs found",
          description: "Try a different search term or check back later.",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <Card className="glass hover-float transition-smooth">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center shadow-glow">
            <Briefcase className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Discover Dream Jobs
          </CardTitle>
          <CardDescription className="text-lg">
            Search thousands of job opportunities from top companies worldwide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="e.g., Software Engineer, Marketing Manager, Designer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg py-6 transition-smooth focus:shadow-glow"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching}
              className="px-8 py-6 text-lg font-semibold bg-gradient-secondary hover:shadow-glow transition-smooth relative overflow-hidden group"
            >
              {isSearching ? (
                <>
                  <div className="spinner mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Jobs
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {jobs.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              Available Opportunities
            </h2>
            <p className="text-muted-foreground">
              {jobs.length} jobs found for "{query}"
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <Card 
                key={index} 
                className="glass hover-float transition-smooth group cursor-pointer fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-smooth">
                    {job.title || 'No title available'}
                  </CardTitle>
                  <CardDescription className="font-medium text-base">
                    {job.company || 'Company not specified'}
                  </CardDescription>
                  {job.location && (
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                    {job.description || 'No description available'}
                  </p>
                  
                  {job.apply_link ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-accent hover:shadow-glow transition-smooth group"
                    >
                      <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="w-full">
                      Application link not available
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};