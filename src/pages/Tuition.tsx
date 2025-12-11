import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, CreditCard, Calendar, CheckCircle } from "lucide-react";
import { useSchoolData } from "@/contexts/SchoolDataContext";

const additionalFees = [
  { item: "Technology Fee (annual)", amount: "1,500 ETB" },
  { item: "Activity Fee (annual)", amount: "1,000 ETB" },
  { item: "Uniform Package", amount: "3,500 ETB" },
  { item: "Books & Materials (estimated)", amount: "2,500-4,000 ETB" },
];

const paymentMethods = [
  "Commercial Bank of Ethiopia (CBE)",
  "Abay Bank",
  "Bunna Bank",
  "Telebirr",
];

const Tuition = () => {
  const { data } = useSchoolData();

  return (
    <Layout>
      {/* Hero with Geometric Background */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
        {/* Geometric Circles */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-20 bottom-20 w-28 h-28 rounded-full border-2 border-gold/20" />
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold-dark rounded-full text-sm font-medium mb-6">
              Investment in Education
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Tuition & Fees
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transparent pricing for quality education. We offer flexible payment options 
              to make Sanete School accessible to families.
            </p>
          </div>
        </div>
      </section>

      {/* Tuition Table */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold-dark font-medium text-sm uppercase tracking-wider">2024-2025</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                Tuition Rates
              </h2>
            </div>

            <Card className="mb-10 border-0 bg-card shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary">
                      <TableHead className="font-semibold text-primary-foreground py-5">Grade Level</TableHead>
                      <TableHead className="text-right font-semibold text-primary-foreground">Tuition (ETB)</TableHead>
                      <TableHead className="text-right font-semibold text-primary-foreground">Registration (ETB)</TableHead>
                      <TableHead className="text-right font-semibold text-primary-foreground">Materials (ETB)</TableHead>
                      <TableHead className="text-right font-semibold text-primary-foreground">Total (ETB)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.tuition.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-foreground py-5">{row.grade}</TableCell>
                        <TableCell className="text-right text-foreground">{row.tuitionFee.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-foreground">{row.registrationFee.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-foreground">{row.materialsFee.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-gold-dark font-bold text-lg">
                          {(row.tuitionFee + row.registrationFee + row.materialsFee).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Additional Fees */}
            <Card className="border-0 bg-muted/30 shadow-lg">
              <CardHeader>
                <CardTitle className="font-display text-xl">Additional Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-border/50 last:border-0">
                      <span className="text-foreground">{fee.item}</span>
                      <span className="font-semibold text-foreground bg-background px-4 py-1.5 rounded-full">{fee.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 w-[300px] h-[300px] rounded-full bg-gold/10 blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Payment Plans */}
            <Card className="border-0 bg-background shadow-lg">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gold-dark" />
                  </div>
                  Payment Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="font-semibold text-foreground mb-2">Annual Payment</h4>
                  <p className="text-sm text-muted-foreground">Pay in full and receive a <span className="text-gold-dark font-semibold">5% discount</span> on tuition.</p>
                </div>
                <div className="p-5 rounded-xl bg-muted/50 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Semester Payment</h4>
                  <p className="text-sm text-muted-foreground">Split into two payments due in September and February.</p>
                </div>
                <div className="p-5 rounded-xl bg-muted/50 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Monthly Installments</h4>
                  <p className="text-sm text-muted-foreground">10 equal monthly payments from September to June.</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-0 bg-background shadow-lg">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gold-dark" />
                  </div>
                  Accepted Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <CheckCircle className="w-5 h-5 text-gold-dark shrink-0" />
                      <span className="text-foreground">{method}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-5 rounded-xl bg-gold/10 border border-gold/20">
                  <p className="text-sm text-foreground">
                    <strong>Financial Aid:</strong> Need-based financial assistance is available. 
                    Contact our admissions office for more information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center text-primary-foreground max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute -left-20 -bottom-20 w-[250px] h-[250px] rounded-full bg-gold/20 blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Need Help Calculating Your Total?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Use our chatbot to get a quick estimate of your total fees based on your child's grade level.
              </p>
              <Button className="bg-gold text-primary hover:bg-gold-light font-semibold h-12 px-8 rounded-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Calculate My Total Fees
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tuition;