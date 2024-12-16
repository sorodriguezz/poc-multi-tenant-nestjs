import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
  Inject,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TenantConnectionService } from '../services/tenant-connection.service';

@Injectable({ scope: Scope.REQUEST })
export class TenantGuard implements CanActivate {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly tenantConnectionService: TenantConnectionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // Obtener el tenant del header
    const tenantName = req.headers['x-tenant-id'];
    if (!tenantName) {
      throw new Error('X-Tenant-Id header is missing');
    }

    const connection =
      await this.tenantConnectionService.getConnectionByTenantName(tenantName);

    req.tenantConnection = connection;
    return true;
  }
}
