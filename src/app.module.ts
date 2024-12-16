import { Module } from '@nestjs/common';
import { TenantRepository } from './repositories/tenant.repository';
import { TenantConnectionService } from './services/tenant-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { APP_GUARD } from '@nestjs/core';
import { TenantGuard } from './guards/tenant.guard';
import { PatientsController } from './controllers/patients.controllers';
import { PatientsService } from './services/patients.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      schema: 'public', // Esquema público con la tabla tenants
      entities: [Tenant],
      synchronize: true,
    }),
  ],
  controllers: [PatientsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TenantGuard, // Cada request pasa por aquí y obtiene su conexión tenant
    },
    TenantRepository,
    TenantConnectionService,
    PatientsService,
  ],
})
export class AppModule {}
