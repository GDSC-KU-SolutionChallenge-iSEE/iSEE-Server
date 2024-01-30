import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No authorization header found');
    }

    const cacheKey = `firebase-token:${token}`;
    const cachedValue = await this.cacheManager.get<number>(cacheKey);
    // console.log('cachedValue:', cachedValue, cacheKey);
    if (cachedValue && FirebaseAuthGuard.checkExpiration(cachedValue)) {
      request.user_id = cachedValue;
      return true;
    } else if (cachedValue) {
      this.cacheManager.del(cacheKey);
    } else {
    }

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request.user_id = decodedToken.uid;
      const ttl = this.configService.get('TOKEN_CACHE_TTL');
      await this.cacheManager.set(cacheKey, decodedToken.exp, ttl);
      // @@@ TODO: DB user create
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractToken(request): string {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    return null;
  }

  private static checkExpiration(inputTime?: number): boolean {
    const currentDateTime = new Date();
    const currentUnixTimestamp = Math.floor(currentDateTime.getTime() / 1000);
    return currentUnixTimestamp < inputTime;
  }
}
