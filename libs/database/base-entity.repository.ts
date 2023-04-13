import { AggregateRoot } from '@nestjs/cqrs';
import { EntityRepository } from './entity.repository';

export abstract class BaseEntityRepository<
  TSchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {
  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ id });
  }

  async findOneAndReplaceById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndReplace(entity, { id });
  }

  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }
}
