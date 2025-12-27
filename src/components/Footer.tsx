import { Bus, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bus-gradient text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Bus className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">TGSRTC</h3>
                <p className="text-sm opacity-80">Telangana State Road Transport Corporation</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Providing safe, reliable and comfortable bus services across Telangana and beyond since 1932.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Track My Bus</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Cancel Ticket</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Print Ticket</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Timetable</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Fare Chart</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Phone className="w-4 h-4" />
                <span>1800-599-0199 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Mail className="w-4 h-4" />
                <span>support@tgsrtc.gov.in</span>
              </li>
              <li className="flex items-start gap-2 opacity-90">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Bus Bhavan, Musheerabad, Hyderabad - 500020</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Clock className="w-4 h-4" />
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-80">
          <p>© 2024 Telangana State Road Transport Corporation. All rights reserved.</p>
          <p className="mt-1">A Government of Telangana Undertaking</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
