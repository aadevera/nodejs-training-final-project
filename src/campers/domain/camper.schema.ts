import { Campers } from '@prisma/client';

export class CamperSchema implements Campers {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly allergies: string[];
}
