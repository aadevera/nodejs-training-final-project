import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CamperDto } from '../domain/camper.dto';
import { CreateCamperCommand } from '../application/commands/create-camper/create-camper.command';
import { UpdateAllergiesCommand } from '../application/commands/update-allergies/update-allergies.command';
import { CreateCamperRequest } from './dto/request/create-camper-request.dto';
import { UpdateCamperAllergiesRequest } from './dto/request/update-camper-allergies-request.dto';
import { FindAllCampersQuery } from '../application/queries/find-all/find-all-campers.query';
import { FindOneCamperQuery } from '../application/queries/find-one/find-one-camper.query';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getCamper(@Param('id') camperId: string): Promise<CamperDto> {
    return this.queryBus.execute<FindOneCamperQuery, CamperDto>(
      new FindOneCamperQuery(camperId),
    );
  }

  @Get()
  async getCampers(): Promise<CamperDto[]> {
    return this.queryBus.execute<FindAllCampersQuery, CamperDto[]>(
      new FindAllCampersQuery(),
    );
  }

  @Post()
  async createCamper(
    @Body() createCamperRequest: CreateCamperRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateCamperCommand, void>(
      new CreateCamperCommand(createCamperRequest),
    );
  }

  @Patch(':id/allergies')
  async updateCamperAllergies(
    @Param('id') camperId: string,
    @Body() updateCamperAllergiesRequest: UpdateCamperAllergiesRequest,
  ): Promise<void> {
    await this.commandBus.execute<UpdateAllergiesCommand, void>(
      new UpdateAllergiesCommand(
        camperId,
        updateCamperAllergiesRequest.allergies,
      ),
    );
  }
}
