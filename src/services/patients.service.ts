import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable({ scope: Scope.REQUEST })
export class PatientsService {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  async findAll(): Promise<Patient[]> {
    const dataSource: DataSource = this.request.tenantConnection;
    return dataSource.getRepository(Patient).find();
  }
}
