import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CamperDto } from 'src/campers/domain/camper.dto';
import { CamperDtoRepository } from 'src/campers/infrastructure/camper-dto.repository';
import { FindOneCamperQuery } from './find-one-camper.query';

@QueryHandler(FindOneCamperQuery)
export class FindOneCamperHandler implements IQueryHandler<FindOneCamperQuery> {
  constructor(private readonly camperDtoRepository: CamperDtoRepository) {}

  async execute({ camperId }: FindOneCamperQuery): Promise<CamperDto> {
    return this.camperDtoRepository.findOne(camperId);
  }
}
