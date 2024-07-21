import { PrismaService } from 'src/prisma.service';
import { CreateFlightFormDto } from './dto/flight-information.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}
  
  async submitApplication(
    flightinformation: CreateFlightFormDto,
  ): Promise<any> {
    console.log(flightinformation);
    const data = await this.prisma.flightForm.create({
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