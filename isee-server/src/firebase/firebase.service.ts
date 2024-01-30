import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin } from './firebase.interface';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FirebaseAdmin') private readonly firebaseAdmin: FirebaseAdmin,
  ) {}

  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid firebase token');
    }
  }
}
