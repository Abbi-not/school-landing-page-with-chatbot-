import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - backend will be added later
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond within 24-48 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero with Geometric Background */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
        {/* Geometric Circles */}
        <div className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute left-1/4 top-20 w-16 h-16 rounded-full border-2 border-gold/20" />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Get In Touch
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              We're here to answer your questions. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute left-0 top-1/3 w-[300px] h-[300px] rounded-full bg-gold/10 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 bg-card shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Fill out the form and we'll get back to you shortly.</p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Abebe Kebede"
                      className="h-12 bg-muted/30 border-border/50 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="abebe@example.com"
                      className="h-12 bg-muted/30 border-border/50 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      className="bg-muted/30 border-border/50 rounded-xl resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground rounded-xl text-base font-medium">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-5">
              <Card className="border-0 bg-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Address</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Addis Ababa, Ethiopia<br />
                        Bole Sub-city, Woreda 03
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Phone</h3>
                      <p className="text-muted-foreground">+251 911 123 456</p>
                      <p className="text-muted-foreground">+251 911 654 321 (Admissions)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground">info@saneteschool.edu.et</p>
                      <p className="text-muted-foreground">admissions@saneteschool.edu.et</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">Office Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 7:30 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 8:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 bg-muted/30 shadow-lg">
              <div className="aspect-[21/9] bg-muted/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gold-dark" />
                  </div>
                  <p className="text-muted-foreground">
                    Google Maps embed will be integrated here
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;