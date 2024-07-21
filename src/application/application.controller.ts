import { Body, Controller, Post, HttpException, HttpStatus, Req } from '@nestjs/common';
import { CreateFlightFormDto } from './dto/flight-information.dto';
import { ApplicationService } from './application.service';

@Controller('/flight-information')
export class ApplicationController {
  constructor(private readonly flightInformationService: ApplicationService) {}

  @Post()
  async submitApplication(
    @Req() request: Request,
    @Body() postData: CreateFlightFormDto,
  ): Promise<any> {
    return this.flightInformationService.submitApplication(postData);
  }
}