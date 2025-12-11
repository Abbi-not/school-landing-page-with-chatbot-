import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, DollarSign, GraduationCap, Calendar, FileText, LogOut, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TuitionManager from "@/components/admin/TuitionManager";
import ProgramsManager from "@/components/admin/ProgramsManager";
import DatesManager from "@/components/admin/DatesManager";
import AdmissionsManager from "@/components/admin/AdmissionsManager";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - backend auth will be added later
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        {/* Geometric Background */}
        <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-1/2 -top-40 w-[400px] h-[400px] rounded-full bg-gold/10 blur-2xl" />
        
        {/* Decorative Circles */}
        <div className="absolute left-20 bottom-20 w-32 h-32 rounded-full border-2 border-gold/20" />
        <div className="absolute right-10 top-10 w-20 h-20 rounded-full border border-primary/20" />
        
        <div className="relative z-10 w-full max-w-md">
          {/* Back to Home */}
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="font-display text-3xl">Admin Portal</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Access the school administration panel
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    placeholder="Enter your username"
                    className="h-12 bg-background/50 border-border/50 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="Enter your password"
                      className="h-12 bg-background/50 border-border/50 rounded-xl pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-base font-medium">
                  Sign In
                </Button>
              </form>
              <p className="text-xs text-center text-muted-foreground mt-6 py-3 bg-muted/30 rounded-lg">
                Enter any username/password to access admin panel
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -right-40 top-0 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-2xl" />
      
      {/* Admin Header */}
      <header className="relative z-10 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-xl">S</span>
                </div>
                <div>
                  <h1 className="font-display text-xl font-semibold text-foreground">Admin Panel</h1>
                  <p className="text-xs text-muted-foreground">Sanete School</p>
                </div>
              </Link>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsLoggedIn(false)}
              className="text-muted-foreground hover:text-foreground gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto py-8 px-4 relative z-10">
        <Tabs defaultValue="tuition" className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl h-14 p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="tuition" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Tuition</span>
            </TabsTrigger>
            <TabsTrigger value="admissions" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Admissions</span>
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Programs</span>
            </TabsTrigger>
            <TabsTrigger value="dates" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Dates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tuition">
            <TuitionManager />
          </TabsContent>

          <TabsContent value="admissions">
            <AdmissionsManager />
          </TabsContent>

          <TabsContent value="programs">
            <ProgramsManager />
          </TabsContent>

          <TabsContent value="dates">
            <DatesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
