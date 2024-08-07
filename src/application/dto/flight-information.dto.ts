export class CreatePassengerDto {
  firstName: string;
  lastName: string;
  birthdate: string;
}

export class CreateFlightFormDto {
  airportDeparture: string;
  finalDestination: string;
  hasConnectingFlights: boolean;
  connectingFlights?: any;
  departureDate: Date;
  airlineName: string;
  flightNumber: string;
  reasonForDelay: string;
  timeArrived: string;
  airlineDisruptionReason: string;
  disruptionDescription?: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  confirmEmail: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  passengers?: any;
  formFourString?: string;
}

