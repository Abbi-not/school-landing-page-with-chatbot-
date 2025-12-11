import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { useSchoolData } from "@/contexts/SchoolDataContext";
import { format } from "date-fns";

const steps = [
  { step: 1, title: "Submit Application", description: "Complete and submit the online application form with required documents" },
  { step: 2, title: "Assessment", description: "Schedule and complete the entrance assessment appropriate for your grade level" },
  { step: 3, title: "Interview", description: "Attend a family interview with our admissions team" },
  { step: 4, title: "Decision", description: "Receive admission decision within 2 weeks of completing all steps" },
];

const Admissions = () => {
  const { data } = useSchoolData();

  return (
    <Layout>
      {/* Hero with Geometric Background */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
        {/* Geometric Circles */}
        <div className="absolute -left-40 top-0 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-1/3 top-10 w-24 h-24 rounded-full border-2 border-gold/20" />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm font-medium mb-6">
              Join Our Community
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Admissions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Begin your journey to excellence. We welcome students from Kindergarten to Grade 8 who are eager to learn, 
              grow, and make a positive impact in their community.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-gold-dark font-medium text-sm uppercase tracking-wider">Requirements</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                What You'll Need
              </h2>
              <p className="text-muted-foreground mb-8">
                To apply for admission to Sanete School, please prepare the following documents:
              </p>
              <div className="space-y-6">
                {data.admissionRequirements.map((req) => (
                  <div key={req.id} className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-4">{req.title}</h3>
                    <ul className="space-y-3">
                      {req.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-0 bg-primary text-primary-foreground shadow-2xl h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="font-display flex items-center gap-3 text-2xl">
                  <Calendar className="w-6 h-6 text-gold" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {data.dates.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-primary-foreground/10 last:border-0">
                      <div>
                        <span className="text-primary-foreground">{item.title}</span>
                        <p className="text-xs text-primary-foreground/60 mt-1">{item.description}</p>
                      </div>
                      <span className="text-gold font-semibold shrink-0 ml-4">
                        {format(new Date(item.date), "MMM d, yyyy")}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full bg-gold/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mb-16">
            <span className="text-gold-dark font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
              Application Process
            </h2>
            <p className="text-muted-foreground mt-4">
              Our streamlined admission process is designed to help you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <Card key={item.step} className="relative border-0 bg-background shadow-lg group hover:shadow-xl transition-shadow">
                <CardContent className="pt-12 pb-8 px-6">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-gold text-primary flex items-center justify-center font-display font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-gold/10 blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-gold/20 blur-2xl" />
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Have Questions?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Our admissions team is here to help. Chat with our assistant or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gold text-primary hover:bg-gold-light font-semibold h-12 px-8 rounded-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask a Question
                </Button>
                <Button variant="outline" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 rounded-full">
                  Contact Admissions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;