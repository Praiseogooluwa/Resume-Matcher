import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeAnalyzer } from '@/components/resume-analyzer';
import { JobSearch } from '@/components/job-search';
import { ThemeToggle } from '@/components/theme-toggle';
import { FloatingParticles } from '@/components/ui/floating-particles';
import { Target, Search, Heart, Github, Linkedin, Twitter } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('analyzer');

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <FloatingParticles />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-xl bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Resume Matcher
                </h1>
                <p className="text-sm text-muted-foreground">AI-Powered Career Solutions</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-glow">
              Find Your Dream Job
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Leverage AI to analyze your resume and discover perfect job matches tailored to your skills and experience
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                AI-Powered Matching
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Real-Time Job Search
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                Smart Analytics
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 glass h-14">
              <TabsTrigger 
                value="analyzer" 
                className="text-lg font-semibold data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Target className="w-5 h-5 mr-2" />
                Resume Analyzer
              </TabsTrigger>
              <TabsTrigger 
                value="search" 
                className="text-lg font-semibold data-[state=active]:bg-gradient-secondary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Job Search
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyzer" className="mt-0">
              <ResumeAnalyzer />
            </TabsContent>

            <TabsContent value="search" className="mt-0">
              <JobSearch />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl bg-card/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-muted-foreground">Built with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-muted-foreground">by</span>
              <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Praise Ogooluwa
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Connect with me:</span>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Praiseogooluwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow hover:scale-110 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/praise-ogooluwa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-glow hover:scale-110 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2025 Resume Matcher. Empowering careers with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
