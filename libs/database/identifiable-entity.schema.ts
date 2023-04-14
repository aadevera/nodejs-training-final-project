import { ObjectID } from 'mongodb';

export abstract class IdentifiableEntitySchema {
  readonly _id: ObjectID;
}
