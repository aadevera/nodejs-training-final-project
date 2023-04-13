import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CamperDto } from 'src/campers/domain/camper.dto';
import { CamperDtoRepository } from 'src/campers/infrastructure/camper-dto.repository';
import { FindAllCampersQuery } from './find-all-campers.query';

@QueryHandler(FindAllCampersQuery)
export class FindAllCampersHandler
  implements IQueryHandler<FindAllCampersQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute(): Promise<CamperDto[]> {
    return this.camperDtoRepository.findAll();
  }
}
