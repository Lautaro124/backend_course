/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface UserToken {
  sub: number;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserToken;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const user: UserToken = await this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      console.error('🚀 ~ AuthGuard ~ error:', error);
      throw new UnauthorizedException('Token invalid');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization'].split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
