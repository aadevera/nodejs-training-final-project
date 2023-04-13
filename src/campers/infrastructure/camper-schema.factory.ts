import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from '../../../libs/database/entity-schema.factory';
import { Camper } from '../domain/Camper';
import { CamperSchema } from '../domain/camper.schema';

@Injectable()
export class CamperSchemaFactory
  implements EntitySchemaFactory<CamperSchema, Camper> {
  create(camper: Camper): CamperSchema {
    return {
      id: camper.getId(),
      name: camper.getName(),
      age: camper.getAge(),
      allergies: camper.getAllergies(),
    };
  }

  createFromSchema(camperSchema: CamperSchema): Camper {
    return new Camper(
      camperSchema.id,
      camperSchema.name,
      camperSchema.age,
      camperSchema.allergies,
    );
  }
}
