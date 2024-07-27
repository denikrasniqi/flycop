import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { AuthModule } from 'src/authentication/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService],
})
export class ApplicationModule {}
