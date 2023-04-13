import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '../../../libs/database/base-entity.repository';
import { Camper } from '../domain/Camper';
import { CamperSchema } from '../domain/camper.schema';
import { CamperSchemaFactory } from './camper-schema.factory';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class CamperEntityRepository extends BaseEntityRepository<
  CamperSchema,
  Camper
> {
  constructor(
    camperSchemaFactory: CamperSchemaFactory,
    prismaService: PrismaService,
  ) {
    super('Campers', camperSchemaFactory, prismaService);
  }
}
