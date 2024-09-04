import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user-role.enum';
import { RolesValidationType } from '../types/roles-validation-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesConfig = this.reflector.getAllAndOverride<{
      roles: UserRole[];
      type: RolesValidationType;
    }>('rolesConfig', [context.getHandler(), context.getClass()]);

    if (!rolesConfig) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    switch (rolesConfig.type) {
      case RolesValidationType.HasAllOfThese:
        // Just as an example, meant to be used in advanced scenarios where user can have multiple roles and permissions
        return rolesConfig.roles.every((role) => role === user.role);
      case RolesValidationType.HasSomeOfThese:
        return rolesConfig.roles.some((role) => role === user.role);
      case RolesValidationType.HasNotHaveAllOfThese:
        return !rolesConfig.roles.every((role) => role === user.role);
      case RolesValidationType.HasNotHaveAnyOfThese:
        return !rolesConfig.roles.some((role) => role === user.role);
      default:
        return true;
    }
  }
}
