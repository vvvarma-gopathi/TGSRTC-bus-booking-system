import { Clock, MapPin, IndianRupee, Bus, Star, Wifi, Snowflake } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface BusInfo {
  id: string;
  serviceNumber: string;
  busType: string;
  departure: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  seatsAvailable: number;
  rating: number;
  amenities: string[];
}

interface BusResultsProps {
  buses: BusInfo[];
  onSelectBus: (bus: BusInfo) => void;
}

const BusResults = ({ buses, onSelectBus }: BusResultsProps) => {
  if (buses.length === 0) {
    return null;
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "ac":
        return <Snowflake className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Available Buses ({buses.length})
        </h2>
        <Badge variant="secondary" className="text-sm">
          Best prices guaranteed
        </Badge>
      </div>

      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="glass-card rounded-xl p-4 md:p-6 hover:shadow-elevated transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Bus Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Bus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">
                      {bus.busType}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Service #{bus.serviceNumber}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-auto lg:ml-4 bg-success/10 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-success fill-success" />
                    <span className="text-sm font-semibold text-success">
                      {bus.rating}
                    </span>
                  </div>
                </div>

                {/* Route & Time */}
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {bus.departureTime}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {bus.departure}
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center min-w-[100px]">
                    <div className="flex flex-col items-center w-full">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {bus.duration}
                      </div>
                      <div className="w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full my-1"></div>
                      <div className="flex gap-2">
                        {bus.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-primary"
                            title={amenity}
                          >
                            {getAmenityIcon(amenity)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {bus.arrivalTime}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {bus.destination}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border lg:pl-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {bus.fare}
                  </div>
                  <div className="text-xs text-muted-foreground">per seat</div>
                </div>
                <div className="text-center">
                  <Badge
                    variant={bus.seatsAvailable > 10 ? "default" : "destructive"}
                    className="mb-2"
                  >
                    {bus.seatsAvailable} seats left
                  </Badge>
                  <Button
                    variant="accent"
                    onClick={() => onSelectBus(bus)}
                    className="w-full"
                  >
                    Select Seats
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusResults;
