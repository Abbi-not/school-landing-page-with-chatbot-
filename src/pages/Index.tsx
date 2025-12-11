import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Award, BookOpen, Calendar, Phone, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Geometric Circles */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        {/* Large Geometric Circles */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-32 top-1/3 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute left-1/4 -bottom-32 w-[400px] h-[400px] rounded-full bg-gold/10 blur-2xl" />
        
        {/* Decorative Circles */}
        <div className="absolute left-10 top-20 w-24 h-24 rounded-full border-2 border-gold/30 opacity-50" />
        <div className="absolute right-20 bottom-20 w-32 h-32 rounded-full border border-primary/20" />
        <div className="absolute right-1/3 top-10 w-16 h-16 rounded-full bg-gold/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm font-medium mb-6">
              Admissions Open 2025
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-foreground leading-tight">
              Sanete
              <br />
              <span className="text-gold-dark">School</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Nurturing Tomorrow's Leaders Today — Providing quality education from Kindergarten to Grade 8 with a focus on academic excellence and character development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-14 text-lg rounded-full">
                <Link to="/admissions">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-foreground/20 hover:bg-foreground/5 h-14 text-lg rounded-full px-8">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section - Clean Horizontal */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gold-dark">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gold-dark">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gold-dark">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-gold-dark">20+</div>
              <div className="text-sm text-muted-foreground mt-1">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
        {/* Background Circles */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mb-16">
            <span className="text-gold-dark font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-foreground">
              Building futures through excellence
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-muted/50 hover:bg-muted transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <GraduationCap className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Quality Education</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive curriculum designed to develop critical thinking and academic excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted/50 hover:bg-muted transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <Users className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Expert Faculty</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experienced and dedicated teachers committed to nurturing every student's potential.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted/50 hover:bg-muted transition-colors group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <Award className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Proven Results</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consistently high academic achievements and exceptional secondary school placements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
        {/* Geometric Elements */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold/10 blur-2xl" />
        <div className="absolute -right-20 bottom-0 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground">
              Get Started Today
            </h2>
            <p className="text-primary-foreground/70 mt-4 text-lg max-w-xl mx-auto">
              Take the first step towards academic excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/admissions" className="group">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/20 transition-all h-full border border-primary-foreground/10">
                <BookOpen className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary-foreground">Admissions</h3>
                <p className="text-primary-foreground/70 text-sm">
                  Learn about requirements and apply online
                </p>
                <ArrowRight className="w-5 h-5 text-gold mt-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link to="/tuition" className="group">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/20 transition-all h-full border border-primary-foreground/10">
                <Calendar className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary-foreground">Tuition & Fees</h3>
                <p className="text-primary-foreground/70 text-sm">
                  View fee structure and payment options
                </p>
                <ArrowRight className="w-5 h-5 text-gold mt-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link to="/contact" className="group">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/20 transition-all h-full border border-primary-foreground/10">
                <Phone className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-xl font-display font-semibold mb-2 text-primary-foreground">Contact Us</h3>
                <p className="text-primary-foreground/70 text-sm">
                  Have questions? Reach out to us
                </p>
                <ArrowRight className="w-5 h-5 text-gold mt-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;