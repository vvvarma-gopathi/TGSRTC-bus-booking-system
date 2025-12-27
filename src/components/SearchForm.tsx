import { useState } from "react";
import { Search, MapPin, Calendar, ArrowRight, Hash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"; 

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  type: "route" | "service";
  departure?: string;
  destination?: string;
  date?: string;
  serviceNumber?: string;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [serviceNumber, setServiceNumber] = useState("");

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ type: "route", departure, destination, date });
  };

  const handleServiceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ type: "service", serviceNumber, date });
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 animate-slide-up">
      <Tabs defaultValue="route" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
          <TabsTrigger value="route" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            Search by Route
          </TabsTrigger>
          <TabsTrigger value="service" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Hash className="w-4 h-4 mr-2" />
            Search by Service No.
          </TabsTrigger>
        </TabsList>

        <TabsContent value="route">
          <form onSubmit={handleRouteSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departure" className="text-foreground font-medium">
                  From
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="departure"
                    placeholder="Departure City"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="pl-11 h-12 bg-background border-2 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-foreground font-medium">
                  To
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                  <Input
                    id="destination"
                    placeholder="Destination City"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-11 h-12 bg-background border-2 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground font-medium">
                  Journey Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-11 h-12 bg-background border-2 border-border focus:border-primary"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Search className="w-5 h-5" />
                  Search Buses
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="service">
          <form onSubmit={handleServiceSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceNumber" className="text-foreground font-medium">
                  Service Number
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    id="serviceNumber"
                    placeholder="e.g., 9001, 5050"
                    value={serviceNumber}
                    onChange={(e) => setServiceNumber(e.target.value)}
                    className="pl-11 h-12 bg-background border-2 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDate" className="text-foreground font-medium">
                  Journey Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="serviceDate"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-11 h-12 bg-background border-2 border-border focus:border-primary"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Search className="w-5 h-5" />
                  Find Bus
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchForm;
