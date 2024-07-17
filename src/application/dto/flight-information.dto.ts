export class FlightInformationDTO {
    flightNumber: string;
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    scheduledDepartureTime: Date;
    actualDepartureTime: Date;
    scheduledArrivalTime: Date;
    actualArrivalTime: Date;
  }