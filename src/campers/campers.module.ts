import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CamperFactory } from './infrastructure/camper.factory';
import { CampersController } from './interface/campers.controller';
import { CamperCommandHandlers } from './application/commands';
import { CamperDtoRepository } from './infrastructure/camper-dto.repository';
import { CamperEntityRepository } from './infrastructure/camper-entity.repository';
import { CamperSchemaFactory } from './infrastructure/camper-schema.factory';
import { CamperEventHandlers } from './application/events';
import { CamperQueryHandlers } from './application/queries';
import { PrismaModule } from 'libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [CampersController],
  providers: [
    CamperEntityRepository,
    CamperDtoRepository,
    CamperSchemaFactory,
    CamperFactory,
    ...CamperCommandHandlers,
    ...CamperEventHandlers,
    ...CamperQueryHandlers,
  ],
})
export class CampersModule {}
