import { Prisma } from "@prisma/client";

export class FlightInformationDTO implements Prisma.FlightInformationCreateInput {
    flightNumber: string;
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    scheduledDepartureTime: Date;
    actualDepartureTime: Date;
    scheduledArrivalTime: Date;
    actualArrivalTime: Date;
  }