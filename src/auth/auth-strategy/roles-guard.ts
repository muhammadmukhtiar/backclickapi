import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly allowedRoles: string[]) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("roles111", request.user)
        // const requiredRoles = ['admin', 'company', 'employ'];
        return user && this.allowedRoles.includes(user.role);
        // return requiredRoles.some(role => roles.includes(role));
    }
}
