import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  //Add isdeleted
  handleRequest(err, user) {
    if (err || !user || user.isDeleted === true) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
