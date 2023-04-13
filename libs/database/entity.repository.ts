import { NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { EntitySchemaFactory } from './entity-schema.factory';
import { PrismaService } from 'libs/prisma/prisma.service';

export abstract class EntityRepository<TSchema, TEntity extends AggregateRoot> {
  protected readonly prisma;
  protected readonly prismaModel;
  constructor(
    protected readonly model: string,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
    protected readonly prismaService: PrismaService,
  ) {
    this.prisma = prismaService;
    this.prismaModel = model;
  }

  protected async findOne({ ...args }: any): Promise<TEntity> {
    const entityDocument = await this.prisma[this.prismaModel].findUnique({
      where: args,
    });

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async find({ ...args }: any): Promise<TEntity[]> {
    return (
      await this.prisma[this.prismaModel].findMany({ where: args })
    ).map(entityDocument =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  async create(entity: TEntity): Promise<void> {
    const schema = this.entitySchemaFactory.create(entity);
    await this.prisma[this.prismaModel].create({ data: schema });
  }

  protected async findOneAndReplace(
    entity: TEntity,
    { ...args }: any,
  ): Promise<void> {
    const schema = this.entitySchemaFactory.create(entity);

    Object.keys(schema).map(e => {
      if (Object.keys(args).find(a => a === e)) {
        delete schema[e];
      }
    });

    const updatedEntity = await this.prisma[this.prismaModel].update({
      where: args,
      data: schema,
    });

    if (!updatedEntity) {
      throw new NotFoundException('Unable to find the entity to replace.');
    }
  }
}
