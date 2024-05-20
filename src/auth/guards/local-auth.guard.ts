import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    if (!username || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return super.canActivate(context);
  }
}
