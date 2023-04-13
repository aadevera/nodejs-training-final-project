import { Injectable } from '@nestjs/common';
import { CamperDto } from '../domain/camper.dto';
import { PrismaService } from 'libs/prisma/prisma.service';
import { Campers } from '@prisma/client';

@Injectable()
export class CamperDtoRepository {
  private readonly prismaModel = 'Campers';
  constructor(private readonly prismaService: PrismaService) {}

  private checkAllergies(camper: Campers): CamperDto {
    const allergiesLower = camper.allergies.map(allergy =>
      allergy.toLocaleLowerCase(),
    );
    const isAllergicToPeanuts = allergiesLower.includes('peanuts');
    return {
      ...camper,
      isAllergicToPeanuts,
    };
  }

  async findAll(): Promise<CamperDto[]> {
    const campers = await this.prismaService[this.prismaModel].findMany({});
    return campers.map(camper => {
      return this.checkAllergies(camper);
    });
  }
  async findOne(camperId: string): Promise<CamperDto> {
    const camper = await this.prismaService[this.prismaModel].findUnique({
      where: { id: camperId },
    });
    return this.checkAllergies(camper);
  }
}
