import { PrismaService } from 'src/prisma.service';
import { FlightInformationDTO } from './dto/flight-information.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  
  async submitApplication(
    flightinformation: FlightInformationDTO,
  ): Promise<any> {
    console.log(flightinformation);
    const data = await this.prisma.flightInformation.create({
      data: {
        ...flightinformation,
        // user: {
        //   connect: {
        //     id: subId,
        //   },
        // },
      },
    });
    return { message: 'Application submitted successfully.', data };
  }
}