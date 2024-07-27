import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './users/user.module';
import { AuthModule } from './authentication/auth.module';
import { ApplicationModule } from './application/application.module';
import { AuthService } from './authentication/auth.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApplicationModule
  ],
  providers: [PrismaService ],
  exports: [PrismaService],
})
export class AppModule {}
