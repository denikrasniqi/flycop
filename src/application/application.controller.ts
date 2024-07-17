import { Body, Controller, Post, HttpException, HttpStatus, Req } from '@nestjs/common';
import { FlightInformationDTO } from './dto/flight-information.dto';
import { ApplicationService } from './application.service';

@Controller('/flight-information')
export class ApplicationController {
  constructor(private readonly flightInformationService: ApplicationService) {}

  @Post()
  async submitApplication(
    @Req() request: Request,
    @Body() postData: FlightInformationDTO,
  ): Promise<any> {
    return this.flightInformationService.submitApplication(postData);
  }
}