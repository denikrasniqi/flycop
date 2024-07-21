import { PrismaService } from 'src/prisma.service';
import { CreateFlightFormDto } from './dto/flight-information.dto';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/authentication/auth.service';
import { RegisterUserDto } from 'src/authentication/dto/register-user.dto';

@Injectable()
export class ApplicationService {

  constructor(private prisma: PrismaService, private readonly authService : AuthService) {}
  
  async submitApplication(
    flightinformation: CreateFlightFormDto,
  ): Promise<any> {
    console.log(flightinformation);
    const data = await this.prisma.flightForm.create({
      data: {
        ...flightinformation,
        progress : 1,
        // user: {
        //   connect: {
        //     id: subId,
        //   },
        // },
      },
    });
    
    return { message: 'Application submitted successfully.', data };
  }
  async updateFlightDetails(id: number, data: Partial<CreateFlightFormDto>) {
    return this.prisma.flightForm.update({
      where: { id },
      data: { ...data, progress: 1 },
    });
  }

  async updateDelayDetails(id: number, data: Partial<CreateFlightFormDto>) {
    return this.prisma.flightForm.update({
      where: { id },
      data: { ...data, progress: 2 },
    });
  }

  async updatePersonalDetails(id: number, data: Partial<CreateFlightFormDto>) {
    return this.prisma.flightForm.update({
      where: { id },
      data: { 
        ...data, 
        passengers: data.passengers ? JSON.stringify(data.passengers) : null,
        progress: 3,
      },
    });
  }

  async updateFormFour(id: number, data: Partial<CreateFlightFormDto>) {
    if (data != null)
    {
      const userdata = await this.prisma.flightForm.findUnique({
        where: { id },
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
    });
    const user = await this.authService.register({
      email: userdata.email,
      name: userdata.firstName,
      password: null,
      role: 2, 
    }) as any;
    console.log(user)
    const application = await this.prisma.flightForm.update({
      where: { id },
      data: { ...data ,userId: user.id , progress: 4 },
    });
      return { message: 'Application submitted successfully.', application };
  }
}
}