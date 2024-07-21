/*
  Warnings:

  - You are about to drop the `FlightInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FlightInformation";

-- CreateTable
CREATE TABLE "FlightForm" (
    "id" SERIAL NOT NULL,
    "airportDeparture" TEXT,
    "finalDestination" TEXT,
    "hasConnectingFlights" BOOLEAN,
    "connectingFlights" JSONB,
    "departureDate" TIMESTAMP(3),
    "airlineName" TEXT,
    "flightNumber" TEXT,
    "reasonForDelay" TEXT,
    "timeArrived" TEXT,
    "airlineDisruptionReason" TEXT,
    "disruptionDescription" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthdate" TIMESTAMP(3),
    "email" TEXT,
    "confirmEmail" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "phoneNumber" TEXT,
    "passengers" JSONB,
    "formFourString" TEXT,
    "bookingReference" TEXT,
    "userId" TEXT,

    CONSTRAINT "FlightForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightForm" ADD CONSTRAINT "FlightForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
