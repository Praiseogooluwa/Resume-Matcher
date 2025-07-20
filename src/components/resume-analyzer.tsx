import { useState } from 'react';
import { Upload, FileText, Search, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface JobMatch {
  title: string;
  company: string;
  location?: string;
  description: string;
  score: number;
  apply_link?: string;
}

interface AnalysisResult {
  matches: JobMatch[];
  error?: string;
}

export const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<JobMatch[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({
        title: "Resume uploaded! 📄",
        description: "Ready to analyze your perfect job matches.",
      });
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !query.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and enter a job title.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("query", query.trim());
      
      const response = await fetch("https://resume-project-6faq.onrender.com/match-jobs/", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data: AnalysisResult = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResults(data.matches || []);
      
      if (data.matches && data.matches.length > 0) {
        toast({
          title: `Found ${data.matches.length} perfect matches! 🎯`,
          description: "Your resume analysis is complete.",
        });
      } else {
        toast({
          title: "No matches found",
          description: "Try a different job title or update your resume.",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="glass hover-float transition-smooth">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume Analyzer & Job Matcher
          </CardTitle>
          <CardDescription className="text-lg">
            Upload your resume and find your perfect job matches with AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobQuery" className="text-lg font-semibold flex items-center gap-2">
                <Search className="w-5 h-5" />
                Job Title
              </Label>
              <Input
                id="jobQuery"
                type="text"
                placeholder="e.g., Frontend Developer, Data Analyst, Product Manager"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg py-6 transition-smooth focus:shadow-glow"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume" className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume (PDF)
              </Label>
              <div className="relative">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-primary file:text-primary-foreground hover:file:shadow-glow transition-smooth h-16 flex items-center"
                  required
                />
                {file && (
                  <div className="mt-2 p-3 bg-secondary/20 rounded-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm">{file.name}</span>
                    <Badge variant="secondary" className="ml-auto">Ready</Badge>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-smooth relative overflow-hidden group"
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner mr-3" />
                  Analyzing Your Resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find Perfect Matches
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-primary animate-pulse" />
              Perfect Job Matches
            </h2>
            <p className="text-muted-foreground">Based on your resume analysis</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((match, index) => (
              <Card 
                key={index} 
                className="glass hover-float transition-smooth group cursor-pointer fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1 group-hover:text-primary transition-smooth">
                        {match.title}
                      </CardTitle>
                      <CardDescription className="font-medium">
                        {match.company}
                      </CardDescription>
                      {match.location && (
                        <CardDescription className="text-sm mt-1">
                          📍 {match.location}
                        </CardDescription>
                      )}
                    </div>
                    <Badge 
                      className={`${getScoreColor(match.score)} text-white font-bold px-3 py-1`}
                    >
                      {match.score}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {match.description}
                  </p>
                  
                  {match.apply_link && match.apply_link !== 'No link available' ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-secondary hover:shadow-glow transition-smooth"
                    >
                      <a href={match.apply_link} target="_blank" rel="noopener noreferrer">
                        Apply Now 🚀
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