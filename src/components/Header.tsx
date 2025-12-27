import { Bus, Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bus-gradient text-primary-foreground shadow-elevated">
      {/* Top bar */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:1800-599-0199" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span>1800-599-0199 (Toll Free)</span>
            </a>
            <a href="mailto:support@tgsrtc.gov.in" className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span>support@tgsrtc.gov.in</span>
            </a>
          </div>
          <div className="text-xs opacity-80">
            A Government of Telangana Undertaking
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground/20 p-3 rounded-xl">
            <Bus className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              TGSRTC
            </h1>
            <p className="text-sm md:text-base opacity-90">
              Online Bus Booking System
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
