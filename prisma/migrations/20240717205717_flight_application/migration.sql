-- CreateTable
CREATE TABLE "FlightInformation" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "departureAirport" TEXT NOT NULL,
    "arrivalAirport" TEXT NOT NULL,
    "scheduledDepartureTime" TIMESTAMP(3) NOT NULL,
    "actualDepartureTime" TIMESTAMP(3) NOT NULL,
    "scheduledArrivalTime" TIMESTAMP(3) NOT NULL,
    "actualArrivalTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightInformation_pkey" PRIMARY KEY ("id")
);
