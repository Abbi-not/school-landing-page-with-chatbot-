import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-display font-bold text-xl">S</span>
              </div>
              <span className="font-display text-xl font-semibold">Sanete School</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nurturing minds, shaping futures. Sanete School is committed to providing 
              quality education from Kindergarten to Grade 8 that prepares students for success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Admissions", "Programs", "Tuition & Fees", "Contact", "About Us"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Addis Ababa, Ethiopia<br />Bole Sub-city, Woreda 03
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/80">+251 911 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-sm text-primary-foreground/80">info@saneteschool.edu.et</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">School Hours</h3>
            <p className="text-sm text-primary-foreground/80 mb-2">Monday - Friday: 7:30 AM - 4:00 PM</p>
            <p className="text-sm text-primary-foreground/80 mb-4">Saturday: 8:00 AM - 12:00 PM</p>
            
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Sanete School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};