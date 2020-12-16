// src/Modules/Repository/Repository.ts

import { Field, ObjectType } from 'type-graphql';
import { Language } from '../Languages/Language';

@ObjectType()
export class Repository {
  @Field()
  public name: string;

  @Field(() => [Language], {
    nullable: true,
  })
  public languages?: Language[];
}
