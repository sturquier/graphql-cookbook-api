import { InputType, Field, Float } from 'type-graphql'

@InputType()
export class IngredientInput {

  @Field()
  name: string

  @Field(() => Float)
  price: number
}
