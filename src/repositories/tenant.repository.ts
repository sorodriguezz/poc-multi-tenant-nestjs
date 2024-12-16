import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';

@Injectable()
export class TenantRepository {
  private readonly repo: Repository<Tenant>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Tenant);
  }

  async findByName(name: string): Promise<Tenant | null> {
    return this.repo.findOne({
      where: { name },
    });
  }
}
