/* eslint-disable */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      let token = authorization.split(' ')[1];
      if (!token)
        throw new Error('You are not authorised to perform this action');

      try {
        const decoded = verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        return true;
      } catch (e) {
        throw new Error('Error while getting the token');
      }
    }
    throw new Error('You are not authorised to perform this action please');
  }
}
