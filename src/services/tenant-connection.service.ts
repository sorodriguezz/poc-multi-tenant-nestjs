import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TenantRepository } from '../repositories/tenant.repository';
import { Patient } from '../entities/patient.entity';
//import { Tenant } from '../entities/tenant.entity';

@Injectable()
export class TenantConnectionService implements OnModuleDestroy {
  private readonly connections: Map<string, DataSource> = new Map();

  constructor(private readonly tenantRepository: TenantRepository) {}

  async getConnectionByTenantName(tenantName: string): Promise<DataSource> {
    if (this.connections.has(tenantName)) {
      return this.connections.get(tenantName);
    }

    const tenant = await this.tenantRepository.findByName(tenantName);

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      schema: tenant.schemaName,
      entities: [Patient],
      synchronize: false,
    });

    await dataSource.initialize();
    this.connections.set(tenantName, dataSource);
    return dataSource;
  }

  async onModuleDestroy() {
    for (const connection of this.connections.values()) {
      await connection.destroy();
    }
  }
}
