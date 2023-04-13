import { AggregateRoot } from '@nestjs/cqrs';

export interface EntitySchemaFactory<TSchema, TEntity extends AggregateRoot> {
  create(entity: TEntity): TSchema;
  createFromSchema(entitySchema: TSchema): TEntity;
}
