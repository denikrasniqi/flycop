/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { User } from '@prisma/client';
// import { getSubIdFromToken } from 'src/decodedToken/getSubIdFromToken';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUsers();
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetched data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }
  // @Get(':username') // Define a route parameter for the username
  // async getUserProfile(
  //   @Param('username') username: string,
  //   @Res() response: Response,
  // ): Promise<any> {
  //   try {
  //     const user = await this.userService.getUserByUsername(username);

  //     if (!user) {
  //       return response.status(404).json({
  //         status: 'Not Found',
  //         message: 'User not found',
  //       });
  //     }

  //     return response.status(200).json({
  //       status: 'Ok!',
  //       message: 'User profile fetched successfully!',
  //       user: user,
  //     });
  //   } catch (error) {
  //     return response.status(500).json({
  //       status: 'Error',
  //       message: 'Internal Server Error!',
  //     });
  //   }
  // }
  // @UseGuards(JwtAuthGuard)
  // @Get('/me')
  // async getUserByToken(@Req() request: Request): Promise<User[]> {
  //   const authorizationHeader = request.headers['authorization'];
  //   const subId = getSubIdFromToken(authorizationHeader);
  //   return this.userService.getUserFromToken(subId);
  // }
}
