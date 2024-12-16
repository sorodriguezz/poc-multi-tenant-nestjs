import { TenantName } from './../decorators/tenant.decorator';
import { Controller, Get } from '@nestjs/common';
import { PatientsService } from '../services/patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async getAllPatients(@TenantName() tenantName: string) {
    console.log(tenantName);
    return this.patientsService.findAll();
  }
}
