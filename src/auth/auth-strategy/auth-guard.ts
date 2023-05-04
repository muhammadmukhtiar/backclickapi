import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext) {
        return true
        // super.canActivate(context);
    }
}
