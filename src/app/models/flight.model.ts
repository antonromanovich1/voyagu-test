export type FlightDto = {
  flights: [Flight, Flight];
  id: number;
  price: number;
};

export type Flight = {
  airline: string;
  arrival_airport: string;
  arrival_date: string;
  arrival_time: string;
  departure_airport: string;
  departure_date: string;
  departure_time: string;
  duration_minutes: number;
  stops: number;
};
