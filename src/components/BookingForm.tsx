import { useState } from "react";
import { User, Mail, Phone, Calendar, Users, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BusInfo } from "./BusResults";
import { useToast } from "@/hooks/use-toast";

interface PassengerInfo {
  seatNumber: string;
  name: string;
  gender: string;
  age: string;
  mobile: string;
  email: string;
}

interface BookingFormProps {
  bus: BusInfo;
  selectedSeats: string[];
  onBookingComplete: () => void;
}

const BookingForm = ({ bus, selectedSeats, onBookingComplete }: BookingFormProps) => {
  const { toast } = useToast();
  const [passengers, setPassengers] = useState<PassengerInfo[]>(
    selectedSeats.map((seat) => ({
      seatNumber: seat,
      name: "",
      gender: "",
      age: "",
      mobile: "",
      email: "",
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const validateForm = () => {
    for (const passenger of passengers) {
      if (!passenger.name.trim()) {
        toast({
          title: "Validation Error",
          description: `Please enter name for seat ${passenger.seatNumber}`,
          variant: "destructive",
        });
        return false;
      }
      if (!passenger.gender) {
        toast({
          title: "Validation Error",
          description: `Please select gender for ${passenger.name || `seat ${passenger.seatNumber}`}`,
          variant: "destructive",
        });
        return false;
      }
      if (!passenger.age || parseInt(passenger.age) < 1 || parseInt(passenger.age) > 120) {
        toast({
          title: "Validation Error",
          description: `Please enter valid age for ${passenger.name || `seat ${passenger.seatNumber}`}`,
          variant: "destructive",
        });
        return false;
      }
      if (!passenger.mobile || !/^\d{10}$/.test(passenger.mobile)) {
        toast({
          title: "Validation Error",
          description: `Please enter valid 10-digit mobile number for ${passenger.name || `seat ${passenger.seatNumber}`}`,
          variant: "destructive",
        });
        return false;
      }
      if (!passenger.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
        toast({
          title: "Validation Error",
          description: `Please enter valid email for ${passenger.name || `seat ${passenger.seatNumber}`}`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const generatedBookingId = `TGSRTC${Date.now().toString().slice(-8)}`;
    setBookingId(generatedBookingId);
    setBookingComplete(true);
    setIsSubmitting(false);

    toast({
      title: "Booking Successful! 🎉",
      description: `Your booking ID is ${generatedBookingId}`,
    });
  };

  if (bookingComplete) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center animate-slide-up">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Your tickets have been booked successfully.
        </p>

        <div className="bg-secondary/30 rounded-xl p-6 mb-6 text-left">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Booking ID</div>
              <div className="font-bold text-primary text-lg">{bookingId}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Service No.</div>
              <div className="font-semibold">{bus.serviceNumber}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Route</div>
              <div className="font-semibold">{bus.departure} → {bus.destination}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Departure</div>
              <div className="font-semibold">{bus.departureTime}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Seats</div>
              <div className="font-semibold">{selectedSeats.join(", ")}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Total Amount</div>
              <div className="font-bold text-primary text-lg">₹{bus.fare * selectedSeats.length}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => window.print()}>
            Print Ticket
          </Button>
          <Button variant="accent" onClick={onBookingComplete}>
            Book Another Ticket
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Passenger Details</h3>
          <p className="text-sm text-muted-foreground">
            Enter details for {selectedSeats.length} passenger(s)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {passengers.map((passenger, index) => (
          <div
            key={passenger.seatNumber}
            className="p-4 bg-secondary/20 rounded-xl border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                {passenger.seatNumber}
              </div>
              <span className="font-semibold text-foreground">
                Passenger {index + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={`name-${index}`}
                    placeholder="Enter full name"
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, "name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`gender-${index}`}>Gender *</Label>
                <Select
                  value={passenger.gender}
                  onValueChange={(value) => updatePassenger(index, "gender", value)}
                >
                  <SelectTrigger id={`gender-${index}`}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`age-${index}`}>Age *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={`age-${index}`}
                    type="number"
                    placeholder="Age"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(e) => updatePassenger(index, "age", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`mobile-${index}`}>Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={`mobile-${index}`}
                    type="tel"
                    placeholder="10-digit mobile"
                    value={passenger.mobile}
                    onChange={(e) => updatePassenger(index, "mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-2">
                <Label htmlFor={`email-${index}`}>Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="email@example.com"
                    value={passenger.email}
                    onChange={(e) => updatePassenger(index, "email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Fare Summary */}
        <div className="bg-primary/5 rounded-xl p-4 border-2 border-primary/20">
          <h4 className="font-semibold text-foreground mb-3">Fare Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Fare ({selectedSeats.length} × ₹{bus.fare})</span>
              <span className="font-medium">₹{bus.fare * selectedSeats.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Tax (5%)</span>
              <span className="font-medium">₹{Math.round(bus.fare * selectedSeats.length * 0.05)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total Amount</span>
              <span className="font-bold text-primary text-lg">
                ₹{Math.round(bus.fare * selectedSeats.length * 1.05)}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay ₹{Math.round(bus.fare * selectedSeats.length * 1.05)} & Confirm Booking
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
