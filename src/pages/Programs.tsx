import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSchoolData } from "@/contexts/SchoolDataContext";

const Programs = () => {
  const { data } = useSchoolData();

  const getColorGradient = (index: number) => {
    const colors = [
      "from-gold/20 to-gold/5",
      "from-primary/20 to-primary/5",
      "from-gold/20 to-primary/10",
      "from-primary/10 to-gold/10",
    ];
    return colors[index % colors.length];
  };

  return (
    <Layout>
      {/* Hero with Geometric Background */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
        {/* Geometric Circles */}
        <div className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 w-20 h-20 rounded-full border-2 border-primary/20" />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Our Curriculum
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Academic Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive programs from Kindergarten to Grade 8, designed to challenge, inspire, and prepare students 
              for success at every stage of their educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute left-0 top-1/3 w-[300px] h-[300px] rounded-full bg-gold/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-8">
            {data.programs.map((program, index) => (
              <Card key={program.id} className="overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${getColorGradient(index)}`} />
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {program.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Users className="w-4 h-4" />
                          {program.grades}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0 rounded-full h-11 px-6">
                      <Download className="w-4 h-4 mr-2" />
                      Download Curriculum
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute -right-20 top-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            Explore our programs in detail or speak with our admissions team to find the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground rounded-full h-12 px-8">
              <Link to="/contact">Schedule a Tour</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;