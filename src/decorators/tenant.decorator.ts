import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantName = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    // Leer el tenant del header "X-Tenant-Id"
    const tenantName = request.headers['x-tenant-id'];
    return tenantName;
  },
);
