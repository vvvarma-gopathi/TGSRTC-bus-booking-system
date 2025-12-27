import { useState } from "react";
import { Armchair, User, Users } from "lucide-react";
import { Button } from "./ui/button";
import { BusInfo } from "./BusResults";

interface Seat {
  id: string;
  number: string;
  status: "available" | "booked" | "selected" | "ladies";
  row: number;
  column: number;
}

interface SeatLayoutProps {
  bus: BusInfo;
  onSeatsSelected: (seats: string[]) => void;
  selectedSeats: string[];
}

const SeatLayout = ({ bus, onSeatsSelected, selectedSeats }: SeatLayoutProps) => {
  // Generate seat layout (2+2 configuration with aisle)
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = 10;
    const bookedSeats = ["A1", "A2", "B3", "C4", "D5", "E2", "F1", "G3", "H4"];
    const ladiesSeats = ["A3", "A4", "B1", "B2"];

    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      for (let col = 1; col <= 4; col++) {
        const seatNumber = `${rowLetter}${col}`;
        let status: Seat["status"] = "available";

        if (bookedSeats.includes(seatNumber)) {
          status = "booked";
        } else if (ladiesSeats.includes(seatNumber)) {
          status = "ladies";
        } else if (selectedSeats.includes(seatNumber)) {
          status = "selected";
        }

        seats.push({
          id: seatNumber,
          number: seatNumber,
          status,
          row,
          column: col,
        });
      }
    }
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;

    const isSelected = selectedSeats.includes(seat.number);
    let newSelected: string[];

    if (isSelected) {
      newSelected = selectedSeats.filter((s) => s !== seat.number);
    } else {
      newSelected = [...selectedSeats, seat.number];
    }

    onSeatsSelected(newSelected);
  };

  const getSeatClass = (seat: Seat) => {
    if (selectedSeats.includes(seat.number)) {
      return "seat seat-selected";
    }
    switch (seat.status) {
      case "booked":
        return "seat seat-booked";
      case "ladies":
        return "seat seat-ladies";
      default:
        return "seat seat-available";
    }
  };

  // Group seats by row
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Select Your Seats</h3>
        <div className="text-sm text-muted-foreground">
          Service #{bus.serviceNumber}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-secondary/30 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-success/20 border-2 border-success"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary border-2 border-primary"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-muted border-2 border-muted"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-pink-100 border-2 border-pink-400"></div>
          <span className="text-sm">Ladies</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="bg-secondary/20 rounded-2xl p-6 overflow-x-auto">
        <div className="min-w-[280px] max-w-[320px] mx-auto">
          {/* Driver Section */}
          <div className="flex justify-end mb-4 pb-4 border-b-2 border-dashed border-border">
            <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Driver</span>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-3">
            {rows.map((rowIndex) => {
              const rowSeats = seats.filter((s) => s.row === rowIndex);
              const leftSeats = rowSeats.filter((s) => s.column <= 2);
              const rightSeats = rowSeats.filter((s) => s.column > 2);

              return (
                <div key={rowIndex} className="flex items-center justify-between gap-4">
                  {/* Left seats (Window + Aisle) */}
                  <div className="flex gap-2">
                    {leftSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={getSeatClass(seat)}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === "booked"}
                        title={`Seat ${seat.number}`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>

                  {/* Aisle */}
                  <div className="w-8 flex items-center justify-center">
                    <div className="w-0.5 h-6 bg-border"></div>
                  </div>

                  {/* Right seats (Aisle + Window) */}
                  <div className="flex gap-2">
                    {rightSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={getSeatClass(seat)}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.status === "booked"}
                        title={`Seat ${seat.number}`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back of bus */}
          <div className="mt-4 pt-4 border-t-2 border-dashed border-border flex justify-center">
            <div className="text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
              Rear of Bus
            </div>
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="font-semibold text-foreground">
                  {selectedSeats.length} Seat(s) Selected
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedSeats.join(", ")}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ₹{bus.fare * selectedSeats.length}
              </div>
              <div className="text-xs text-muted-foreground">Total Fare</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
