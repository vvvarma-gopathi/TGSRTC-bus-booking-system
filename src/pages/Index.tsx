import { useState } from "react";
import { Bus, Shield, Clock, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import SearchForm, { SearchData } from "@/components/SearchForm";
import BusResults, { BusInfo } from "@/components/BusResults";
import SeatLayout from "@/components/SeatLayout";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

// Mock bus data
const mockBuses: BusInfo[] = [
  {
    id: "1",
    serviceNumber: "9001",
    busType: "Garuda Plus AC Sleeper",
    departure: "Hyderabad",
    destination: "Vijayawada",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "6h 30m",
    fare: 850,
    seatsAvailable: 23,
    rating: 4.5,
    amenities: ["AC", "WiFi"],
  },
  {
    id: "2",
    serviceNumber: "5050",
    busType: "Super Luxury AC Seater",
    departure: "Hyderabad",
    destination: "Vijayawada",
    departureTime: "06:00",
    arrivalTime: "12:00",
    duration: "6h 00m",
    fare: 550,
    seatsAvailable: 8,
    rating: 4.2,
    amenities: ["AC"],
  },
  {
    id: "3",
    serviceNumber: "7777",
    busType: "Rajdhani Express",
    departure: "Hyderabad",
    destination: "Vijayawada",
    departureTime: "14:30",
    arrivalTime: "20:30",
    duration: "6h 00m",
    fare: 450,
    seatsAvailable: 15,
    rating: 4.0,
    amenities: ["AC"],
  },
  {
    id: "4",
    serviceNumber: "3030",
    busType: "Palle Velugu Non-AC",
    departure: "Hyderabad",
    destination: "Vijayawada",
    departureTime: "08:00",
    arrivalTime: "15:00",
    duration: "7h 00m",
    fare: 280,
    seatsAvailable: 32,
    rating: 3.8,
    amenities: [],
  },
];

const Index = () => {
  const [searchResults, setSearchResults] = useState<BusInfo[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusInfo | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (searchData: SearchData) => {
    // Simulate search - in real app, this would call an API
    setHasSearched(true);
    setSelectedBus(null);
    setSelectedSeats([]);
    setShowBookingForm(false);
    
    if (searchData.type === "service") {
      const filtered = mockBuses.filter(
        (bus) => bus.serviceNumber === searchData.serviceNumber
      );
      setSearchResults(filtered.length > 0 ? filtered : mockBuses.slice(0, 1));
    } else {
      setSearchResults(mockBuses);
    }
  };

  const handleSelectBus = (bus: BusInfo) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setShowBookingForm(false);
  };

  const handleSeatsSelected = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length > 0) {
      setShowBookingForm(true);
    }
  };

  const handleBookingComplete = () => {
    setSearchResults([]);
    setSelectedBus(null);
    setSelectedSeats([]);
    setShowBookingForm(false);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Book Your Journey with{" "}
              <span className="text-primary">TGSRTC</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Safe, comfortable and affordable bus travel across Telangana and beyond.
              Book your tickets online in minutes!
            </p>
          </div>

          <SearchForm onSearch={handleSearch} />

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: Shield, label: "Safe Travel", desc: "GPS tracked buses" },
              { icon: Clock, label: "On Time", desc: "Punctual departures" },
              { icon: CreditCard, label: "Easy Payment", desc: "Multiple options" },
              { icon: Bus, label: "Wide Network", desc: "1000+ routes" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card/60 backdrop-blur-sm rounded-xl p-4 text-center border border-border/50"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">{feature.label}</div>
                <div className="text-sm text-muted-foreground">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {hasSearched && !selectedBus && (
            <BusResults buses={searchResults} onSelectBus={handleSelectBus} />
          )}

          {selectedBus && !showBookingForm && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setSelectedBus(null)}
                  className="text-primary hover:underline font-medium"
                >
                  ← Back to results
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SeatLayout
                  bus={selectedBus}
                  selectedSeats={selectedSeats}
                  onSeatsSelected={handleSeatsSelected}
                />

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Trip Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                      <Bus className="w-10 h-10 text-primary" />
                      <div>
                        <div className="font-bold text-foreground">
                          {selectedBus.busType}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Service #{selectedBus.serviceNumber}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">From</div>
                        <div className="font-semibold">{selectedBus.departure}</div>
                        <div className="text-primary font-bold text-lg">
                          {selectedBus.departureTime}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">To</div>
                        <div className="font-semibold">{selectedBus.destination}</div>
                        <div className="text-primary font-bold text-lg">
                          {selectedBus.arrivalTime}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Selected Seats</span>
                        <span className="font-semibold">
                          {selectedSeats.length > 0
                            ? selectedSeats.join(", ")
                            : "None selected"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Fare per seat</span>
                        <span className="font-semibold">₹{selectedBus.fare}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t border-border pt-2">
                        <span>Total Amount</span>
                        <span className="text-primary">
                          ₹{selectedBus.fare * selectedSeats.length}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToBooking}
                      disabled={selectedSeats.length === 0}
                      className="w-full bg-accent text-accent-foreground font-semibold py-4 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {selectedSeats.length > 0
                        ? `Proceed to Book ${selectedSeats.length} Seat(s)`
                        : "Select seats to continue"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showBookingForm && selectedBus && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-primary hover:underline font-medium"
                >
                  ← Back to seat selection
                </button>
              </div>
              <BookingForm
                bus={selectedBus}
                selectedSeats={selectedSeats}
                onBookingComplete={handleBookingComplete}
              />
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-4">
                <Bus className="w-10 h-10 text-primary animate-float" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to travel?
              </h3>
              <p className="text-muted-foreground">
                Search for buses using the form above to start your journey.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
