// src/Modules/Repository/Languages/Language.ts
import { Field, Float, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Language {
  @Field(() => ID)
  public id: string;

  @Field()
  public name: string;

  @Field(() => String)
  public percentage: string;
}
