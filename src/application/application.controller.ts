import { Body, Controller, Post, HttpException, HttpStatus, Req, Put, Param } from '@nestjs/common';
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

  @Put(':id/flight-details')
  async updateFlightDetails(@Param('id') id: string, @Body() updateFlightFormDto: Partial<CreateFlightFormDto>) {
    return this.flightInformationService.updateFlightDetails(+id, updateFlightFormDto);
  }

  @Put(':id/delay-details')
  async updateDelayDetails(@Param('id') id: string, @Body() updateFlightFormDto: Partial<CreateFlightFormDto>) {
    return this.flightInformationService.updateDelayDetails(+id, updateFlightFormDto);
  }

  @Put(':id/personal-details')
  async updatePersonalDetails(@Param('id') id: string, @Body() updateFlightFormDto: Partial<CreateFlightFormDto>) {
    return this.flightInformationService.updatePersonalDetails(+id, updateFlightFormDto);
  }

  @Put(':id/form-four')
  async updateFormFour(@Param('id') id: string, @Body() updateFlightFormDto: Partial<CreateFlightFormDto>) {
    return this.flightInformationService.updateFormFour(+id, updateFlightFormDto);
  }
}